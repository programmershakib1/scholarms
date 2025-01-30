require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://scholarms.netlify.app",
      "https://assignment-12-batch-10.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@programmershakib.sm4uc.mongodb.net/?retryWrites=true&w=majority&appName=programmershakib`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );

    const usersCollection = client.db("scholarDB").collection("users");
    const scholarshipsCollection = client
      .db("scholarDB")
      .collection("scholarships");
    const appliedScholarshipsCollection = client
      .db("scholarDB")
      .collection("appliedScholarships");
    const reviewsCollection = client.db("scholarDB").collection("reviews");
    const successfulApplicationsCollection = client
      .db("scholarDB")
      .collection("success");
    const specialScholarshipsCollection = client
      .db("scholarDB")
      .collection("specials");
    const questionsCollection = client.db("scholarDB").collection("questions");

    // jwt
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: "10d",
      });
      res.send({ token });
    });

    // verify token
    const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "unAuthorized access" });
      }

      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "unAuthorized access" });
        }
        req.decoded = decoded;
        next();
      });
    };

    // verify admin
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;

      const query = { email: email };

      const user = await usersCollection.findOne(query);

      const isAdmin = user?.role === "admin";

      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // scholarship
    // get all scholarship
    app.get("/all-scholarship/:email", async (req, res) => {
      const email = req.params.email;

      const userInfo = await usersCollection.findOne({ email });

      const scholarships = await scholarshipsCollection
        .find()
        .limit(10)
        .toArray();
      res.send({ userInfo, scholarships });
    });

    // get all scholarship with pagination in public
    app.get("/scholarships", async (req, res) => {
      const search = req.query.search || "";
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;
      const feeFilter = req.query.feeFilter || "";
      const skip = (page - 1) * limit;

      const query = {
        ...(search && {
          $or: [
            { scholarship_name: { $regex: search, $options: "i" } },
            { university_name: { $regex: search, $options: "i" } },
            { degree: { $regex: search, $options: "i" } },
          ],
        }),
        ...(feeFilter === "free" && { application_fee: 0 }),
        ...(feeFilter === "lowest" && { application_fee: { $gt: 0 } }),
        ...(feeFilter === "highest" && { application_fee: { $gte: 0 } }),
      };

      const sort =
        feeFilter === "lowest"
          ? { application_fee: 1 }
          : feeFilter === "highest"
          ? { application_fee: -1 }
          : {};

      const total = await scholarshipsCollection.countDocuments(query);

      const scholarships = await scholarshipsCollection
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .toArray();

      const scholarshipsWithRatings = await Promise.all(
        scholarships.map(async (scholarship) => {
          const reviews = await reviewsCollection
            .find({ scholarship_id: scholarship._id.toString() })
            .toArray();

          const totalRatings = reviews.reduce(
            (sum, review) => sum + (review.rating || 0),
            0
          );
          const averageRating =
            reviews.length > 0
              ? (totalRatings / reviews.length).toFixed(1)
              : "N/A";
          return {
            ...scholarship,
            averageRating,
            totalReviews: reviews.length,
          };
        })
      );

      const totalPages = Math.ceil(total / limit);

      res.send({
        scholarships: scholarshipsWithRatings,
        currentPage: page,
        totalPages,
      });
    });

    // get top scholarship
    app.get("/top-scholarships", async (req, res) => {
      const scholarships = await scholarshipsCollection
        .find({})
        .sort({ application_fee: 1, posted_date: -1 })
        .limit(6)
        .toArray();

      const scholarshipsWithRatings = await Promise.all(
        scholarships.map(async (scholarship) => {
          const reviews = await reviewsCollection
            .find({ scholarship_id: scholarship._id.toString() })
            .toArray();

          const totalRatings = reviews.reduce(
            (sum, review) => sum + (review.rating || 0),
            0
          );
          const averageRating =
            reviews.length > 0 ? totalRatings / reviews.length : null;

          return {
            ...scholarship,
            averageRating: averageRating ? averageRating.toFixed(1) : "N/A",
            totalReviews: reviews.length,
          };
        })
      );

      res.send(scholarshipsWithRatings);
    });

    // all scholarship get in manage page 
    app.get("/manage-scholarship", verifyToken, async (req, res) => {
      const result = await scholarshipsCollection.find().toArray();
      res.send(result);
    });

    // get single scholarship
    app.get("/scholarship/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const reviewQuery = { scholarship_id: id };

      const scholarship = await scholarshipsCollection.findOne(query);

      const reviews = await reviewsCollection.find(reviewQuery).toArray();

      res.send({ scholarship, reviews });
    });

    // add scholarship
    app.post("/scholarship", verifyToken, async (req, res) => {
      const scholarshipInfo = req.body;

      const result = await scholarshipsCollection.insertOne(scholarshipInfo);
      res.send(result);
    });

    // update scholarship
    app.patch("/scholarship/:id", verifyToken, async (req, res) => {
      const id = req.params.id;

      const filter = { _id: new ObjectId(id) };

      const updatedDoc = {
        $set: {
          scholarship_name: req.body.scholarship_name,
          university_name: req.body.university_name,
          city: req.body.city,
          country: req.body.country,
          university_rank: req.body.university_rank,
          tuition_fee: req.body.tuition_fee,
          application_fee: req.body.application_fee,
          service_charge: req.body.service_charge,
          subject_category: req.body.subject_category,
          scholarship_category: req.body.scholarship_category,
          degree: req.body.degree,
          deadline: req.body.deadline,
          description: req.body.description,
          posted_date: req.body.posted_date,
          posted_email: req.body.posted_email,
          updatedDate: req.body.updatedDate,
          stipend: req.body.stipend,
          image: req.body.image,
        },
      };

      const result = await scholarshipsCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // cancel scholarship
    app.delete("/scholarship/:id", verifyToken, async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await scholarshipsCollection.deleteOne(query);
      res.send(result);
    });

    // applied scholarship
    // get all applied scholarship
    app.get("/applied-scholarships", verifyToken, async (req, res) => {
      const { sortBy, filterBy } = req.query;

      let query = {};
      let sortOptions = {};

      if (filterBy === "active") {
        query.deadline = { $gte: new Date().toISOString() };
      } else if (filterBy === "expired") {
        query.deadline = { $lt: new Date().toISOString() };
      }

      if (sortBy === "appliedDateDesc") {
        sortOptions.applied_date = -1;
      } else if (sortBy === "appliedDateAsc") {
        sortOptions.applied_date = 1;
      } else if (sortBy === "deadlineAsc") {
        sortOptions.deadline = 1;
      } else if (sortBy === "deadlineDesc") {
        sortOptions.deadline = -1;
      }

      const result = await appliedScholarshipsCollection
        .find(query)
        .sort(sortOptions)
        .toArray();

      res.send(result);
    });

    // get user applied scholarship
    app.get("/applied-scholarships/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      const result = await appliedScholarshipsCollection
        .find({ user_email: email })
        .toArray();
      res.send(result);
    });

    // get single applied scholarship
    app.get("/applied-scholarship/:id", verifyToken, async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await appliedScholarshipsCollection.findOne(query);
      res.send(result);
    });

    // add applied scholarship
    app.post("/apply-scholarship", verifyToken, async (req, res) => {
      const appliedInfo = req.body;

      const result = await appliedScholarshipsCollection.insertOne(appliedInfo);
      res.send(result);
    });

    // applied application feedback
    app.patch("/applied-scholarship/:id", verifyToken, async (req, res) => {
      const id = req.params.id;

      const filter = { _id: new ObjectId(id) };

      const updatedDoc = {
        $set: {
          feedback: req.body.feedback,
        },
      };

      const result = await appliedScholarshipsCollection.updateOne(
        filter,
        updatedDoc
      );
      res.send(result);
    });

    // application status change
    app.patch(
      "/application-status-change/:id",
      verifyToken,
      async (req, res) => {
        const id = req.params.id;
        const { status } = req.body;

        const filter = { _id: new ObjectId(id) };

        const updatedStatus = {
          $set: {
            status: status,
          },
        };

        const result = await appliedScholarshipsCollection.updateOne(
          filter,
          updatedStatus
        );

        if (status === "Completed") {
          const application = await appliedScholarshipsCollection.findOne(
            filter
          );

          const successData = {
            applicantName: application.user_name,
            applicantEmail: application.user_email,
            applicantPhoto: application.applicant_photo,
            scholarshipName: application.scholarship_name,
            university: application.university_name,
            completionDate: new Date().toISOString(),
          };
          await successfulApplicationsCollection.insertOne(successData);
        }
        res.send(result);
      }
    );

    // application status rejected
    app.patch(
      "/applied-scholarship-cancel/:id",
      verifyToken,
      async (req, res) => {
        const id = req.params.id;

        const filter = { _id: new ObjectId(id) };

        const updatedDoc = {
          $set: {
            status: "Rejected",
          },
        };

        const result = await appliedScholarshipsCollection.updateOne(
          filter,
          updatedDoc
        );
        res.send(result);
      }
    );

    // update applied scholarship
    app.patch("/update-scholarship/:id", verifyToken, async (req, res) => {
      const id = req.params.id;

      const filter = { _id: new ObjectId(id) };

      const checkStatus = await appliedScholarshipsCollection.findOne(filter);

      if (checkStatus.status !== "Pending") {
        return res.send({
          status: false,
          message: "You cannot update this application",
        });
      }

      const updatedDoc = {
        $set: {
          phone_number: req.body.phone_number,
          village: req.body.village,
          district: req.body.district,
          country: req.body.country,
          gender: req.body.gender,
          degree: req.body.degree,
          ssc_result: req.body.ssc_result,
          hsc_result: req.body.hsc_result,
          study_gap: req.body.study_gap,
          applicant_photo: req.body.applicant_photo,
          scholarship_name: req.body.scholarship_name,
          university_name: req.body.university_name,
          university_city: req.body.university_city,
          university_country: req.body.university_country,
          application_fee: req.body.application_fee,
          service_charge: req.body.service_charge,
          subject_category: req.body.subject_category,
          scholarship_category: req.body.scholarship_category,
          deadline: req.body.deadline,
          user_name: req.body.user_name,
          user_email: req.body.user_email,
          user_id: req.body.user_id,
          scholarship_id: req.body.scholarship_id,
          applied_date: req.body.applied_date,
          updated_date: req.body.updated_date,
          feedback: req.body.feedback,
          status: req.body.status,
        },
      };

      const result = await appliedScholarshipsCollection.updateOne(
        filter,
        updatedDoc
      );
      res.send(result);
    });

    // applied application cancel
    app.delete("/applied-scholarship/:id", verifyToken, async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await appliedScholarshipsCollection.deleteOne(query);
      res.send(result);
    });

    // success applications
    app.get("/success-applications", async (req, res) => {
      const result = await successfulApplicationsCollection.find().toArray();
      res.send(result);
    });

    app.delete("/success-application/:id", verifyToken, async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await successfulApplicationsCollection.deleteOne(query);
      res.send(result);
    });

    // reviews
    // get all reviews
    app.get("/reviews", verifyToken, async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    // user all review
    app.get("/reviews/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      const query = { user_email: email };

      const result = await reviewsCollection.find(query).toArray();
      res.send(result);
    });

    // add review
    app.post("/review", verifyToken, async (req, res) => {
      const reviewDetail = req.body;

      const result = await reviewsCollection.insertOne(reviewDetail);
      res.send(result);
    });

    // update review
    app.patch("/review/:id", verifyToken, async (req, res) => {
      const id = req.params.id;

      const filter = { _id: new ObjectId(id) };

      const updatedDoc = {
        $set: {
          rating: req.body.rating,
          review: req.body.review,
        },
      };

      const result = await reviewsCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // delete review
    app.delete("/review/:id", verifyToken, async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await reviewsCollection.deleteOne(query);
      res.send(result);
    });

    // special scholarship
    app.get(
      "/special-scholarships",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const result = await specialScholarshipsCollection.find().toArray();
        res.send(result);
      }
    );

    // add special scholarship
    app.post("/special-scholarship", verifyToken, async (req, res) => {
      const specialScholarshipInfo = req.body;

      const result = await specialScholarshipsCollection.insertOne(
        specialScholarshipInfo
      );
      res.send(result);
    });

    // special scholarship update status
    app.patch(
      "/special-scholarship/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;

        const filter = { _id: new ObjectId(id) };

        const updatedStatus = {
          $set: {
            status: req.body.status,
          },
        };

        const result = await specialScholarshipsCollection.updateOne(
          filter,
          updatedStatus
        );
        res.send(result);
      }
    );

    app.delete(
      "/special-scholarship/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;

        const query = { _id: new ObjectId(id) };

        const result = await specialScholarshipsCollection.deleteOne(query);
        res.send(result);
      }
    );

    // payment intent
    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    // user
    // get all users
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const { role } = req.query;

      const query = role ? { role } : {};

      const result = await usersCollection.find(query).toArray();
      res.send(result);
    });

    // get user
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email });
      res.send(result);
    });

    // add and update user
    app.put("/user", async (req, res) => {
      const { email, lastSignIn } = req.body;
      const userInfo = req.body;

      const user = await usersCollection.findOne({ email });

      const role = "user";

      if (user) {
        const updatedUser = {
          $set: {
            lastSignIn: lastSignIn,
          },
        };
        const result = await usersCollection.updateOne({ email }, updatedUser);
        res.send(result);
      } else {
        const newUser = { ...userInfo, role };
        const result = await usersCollection.insertOne(newUser);
        res.send(result);
      }
    });

    app.patch("/signUp-user", async (req, res) => {
      const userInfo = req.body;

      const email = userInfo.email;

      const role = "user";

      const user = await usersCollection.findOne({ email });

      if (user) {
        const updatedUser = {
          $set: {
            name: req.body.name,
            email: req.body.email,
            photo: req.body.photo,
            signUp: req.body.signUp,
            lastSignIn: req.body.lastSignIn,
            role: "user",
          },
        };
        const result = await usersCollection.updateOne({ email }, updatedUser);
        res.send(result);
      } else {
        const newUser = { ...userInfo, role };
        const result = await usersCollection.insertOne(newUser);
        res.send(result);
      }
    });

    // update profile
    app.patch("/update-profile", verifyToken, async (req, res) => {
      const email = req.body.email;

      const updatedDoc = {
        $set: {
          name: req.body.name,
          photo: req.body.photo,
          cover: req.body.cover,
          lastSignIn: req.body.lastSignIn,
        },
      };

      const result = await usersCollection.updateOne({ email }, updatedDoc);
      res.send(result);
    });

    // user role update
    app.patch("/user/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;

      const filter = { _id: new ObjectId(id) };

      const updatedRole = {
        $set: {
          role: req.body.role,
        },
      };

      const result = await usersCollection.updateOne(filter, updatedRole);
      res.send(result);
    });

    // delete user
    app.delete("/user/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    // question
    app.post("/question", async (req, res) => {
      const questionInfo = req.body;
      const result = await questionsCollection.insertOne(questionInfo);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("assignment 12 is running");
});

app.listen(port, () => {
  console.log(`assignment 12 is running on port ${port}`);
});
