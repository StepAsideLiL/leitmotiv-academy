const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9snmkln.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "Unauthorized access 1" });
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "Unauthorized access 2" });
    }
    req.decoded = decoded;
    next();
  });
};

app.get("/", (req, res) => {
  res.send("Leitmotiv Academy!");
});

app.listen(port, () => {
  console.log(`Leitmotiv Academy app listening on port ${port}`);
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();

    // leitmotivDB collections
    const usersCollection = client.db("leitmotivDB").collection("users");
    const coursesCollection = client.db("leitmotivDB").collection("courses");
    const paymentsCollection = client.db("leitmotivDB").collection("payments");

    // ========== JWT secret token Start
    /**
     * POST: Send an access token to the client when user loggenin.
     */
    app.post("/v1/jwt", async (req, res) => {
      const user = req.body;

      const token = jwt.sign(user, process.env.SECRET_TOKEN, {
        expiresIn: "1day",
      });

      res.send({ token });
    });
    // ========== JWT secret token End

    // Users collection API Endpoints Start
    /**
     * GET: Get the role of the logged in user.
     */
    app.get("/v1/users/:email", async (req, res) => {
      const email = req.params.email;

      const user = await usersCollection.findOne({ email: email });

      res.send(user);
    });

    /**
     * GET: Get all users for admin.
     */
    app.get("/v1/users", verifyJWT, async (req, res) => {
      const result = await usersCollection.find().toArray();

      res.send(result);
    });

    /**
     * GET: Get all the instructors from the db.
     */
    app.get("/v1/instructors", async (req, res) => {
      const result = await usersCollection
        .find({ role: "instructor" })
        .toArray();

      res.send(result);
    });

    /**
     * GET: Get one instructor from the db.
     */
    app.get("/v1/instructors/:id", async (req, res) => {
      const userId = req.params.id;

      const result = await usersCollection.findOne({
        _id: new ObjectId(userId),
      });

      res.send(result);
    });

    /**
     * GET: Get if the student selected the course or not.
     */
    app.get("/v1/users/:student/course/:id", async (req, res) => {
      const courseId = req.params.id;
      const email = req.params.student;

      const result = await usersCollection.findOne({
        email: email,
        selectedCourses: new ObjectId(courseId),
      });
      const hasSelected = result ? true : false;

      res.send({ hasSelected });
    });

    /**
     * GET: Get all the seleted courses by logged in student.
     */
    app.get("/v1/users/:student/courses", verifyJWT, async (req, res) => {
      const email = req.params.student;

      const student = await usersCollection.findOne({ email: email });
      const courses = await coursesCollection
        .find({ _id: { $in: student.selectedCourses } })
        .toArray();

      res.send(courses);
    });

    /**
     * POST: Add users email and role in db.
     */
    app.post("/v1/users", async (req, res) => {
      const user = req.body;

      const isUserExist = await usersCollection.findOne({ email: user.email });
      if (isUserExist) {
        return res.send({ acknowledged: true });
      }
      const result = await usersCollection.insertOne(user);

      res.send(result);
    });

    /**
     * PATCH: Update user role to admin.
     */
    app.patch("/v1/users/admin/:id", async (req, res) => {
      const userId = req.params.id;

      const query = { _id: new ObjectId(userId) };
      const options = { upsert: false };
      const updateRole = {
        $set: {
          role: "admin",
        },
      };

      const result = await usersCollection.updateOne(
        query,
        updateRole,
        options
      );

      res.send(result);
    });

    /**
     * PATCH: Update user role to admin.
     */
    app.patch("/v1/users/instructor/:id", async (req, res) => {
      const userId = req.params.id;

      const query = { _id: new ObjectId(userId) };
      const options = { upsert: false };
      const updateRole = {
        $set: {
          role: "instructor",
        },
      };

      const result = await usersCollection.updateOne(
        query,
        updateRole,
        options
      );

      res.send(result);
    });

    /**
     * PATCH: Add a course in selectedCourses field.
     */
    app.patch("/v1/users/student/course/:id", async (req, res) => {
      const courseId = req.params.id;
      const email = req.body.email;

      const query = { email: email };
      const options = { upsert: false };
      const updateCourse = {
        $push: { selectedCourses: new ObjectId(courseId) },
      };

      const result = await usersCollection.updateOne(
        query,
        updateCourse,
        options
      );

      res.send(result);
    });

    /**
     * Delete: Delete a user.
     */
    app.delete("/v1/users/:id", async (req, res) => {
      const userId = req.params.id;

      const result = await usersCollection.deleteOne({
        _id: new ObjectId(userId),
      });

      res.send(result);
    });

    /**
     * DELETE: Update user role to admin.
     */
    app.delete("/v1/users/:student/course/:id", async (req, res) => {
      const courseId = req.params.id;
      const email = req.params.student;

      const query = { email: email };
      const options = { upsert: false };
      const updateCourse = {
        $pull: { selectedCourses: new ObjectId(courseId) },
      };

      const result = await usersCollection.updateOne(
        query,
        updateCourse,
        options
      );

      res.send(result);
    });
    // Users collection API Endpoints End

    // Courses collectin API Endpoints Start
    /**
     * GET: Get all the courses for admin.
     */
    app.get("/v1/courses", async (req, res) => {
      const result = await coursesCollection.find().toArray();

      res.send(result);
    });

    /**
     * GET: Get all the approved courses for Classes page.
     */
    app.get("/v1/courses/approved", async (req, res) => {
      const result = await coursesCollection
        .find({ status: "Approved" })
        .toArray();

      res.send(result);
    });

    /**
     * GET: Get a course for edit.
     */
    app.get("/v1/courses/:id", async (req, res) => {
      const courseId = req.params.id;

      const result = await coursesCollection.findOne({
        _id: new ObjectId(courseId),
      });

      res.send(result);
    });

    /**
     * GET: Get all the courses by an instructor.
     */
    app.get("/v1/courses/instructor/:email", async (req, res) => {
      const email = req.params.email;

      const result = await coursesCollection
        .find({ instructorEmail: email })
        .toArray();

      res.send(result);
    });

    /**
     * POST: Add courses in db.
     */
    app.post("/v1/courses", async (req, res) => {
      const course = req.body;

      const result = await coursesCollection.insertOne(course);

      res.send(result);
    });

    /**
     * PATCH: Update a course information.
     */
    app.patch("/v1/courses/:id", async (req, res) => {
      const courseId = req.params.id;
      const course = req.body;

      const query = { _id: new ObjectId(courseId) };
      const options = { upsert: false };
      const updateRole = {
        $set: {
          courseName: course.courseName,
          description: course.description,
          courseImage: course.courseImage,
          availableSeats: course.availableSeats,
          price: course.price,
        },
      };

      const result = await coursesCollection.updateOne(
        query,
        updateRole,
        options
      );

      res.send(result);
    });

    /**
     * PATCH: Update a course status.
     */
    app.patch("/v1/courses/status/:id", async (req, res) => {
      const courseId = req.params.id;
      const status = req.body;

      const query = { _id: new ObjectId(courseId) };
      const options = { upsert: false };
      const updateRole = {
        $set: {
          status: status.status,
        },
      };

      const result = await coursesCollection.updateOne(
        query,
        updateRole,
        options
      );

      res.send(result);
    });

    /**
     * PATCH: Update or add a course feedback.
     */
    app.patch("/v1/courses/feedback/:id", async (req, res) => {
      const courseId = req.params.id;
      const feedback = req.body;

      const query = { _id: new ObjectId(courseId) };
      const options = { upsert: false };
      const updateRole = {
        $set: {
          feedback: feedback.feedback,
        },
      };

      const result = await coursesCollection.updateOne(
        query,
        updateRole,
        options
      );

      res.send(result);
    });
    // Courses collectin API Endpoints End

    // Create Payment Intent Start
    /**
     * POST: for payment.
     */
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;

      const totalAmount = price * 100;

      if (totalAmount < 1) {
        return;
      }

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });
    // Create Payment Intent End

    // Payment collectin API Endpoint Start
    /**
     * GET: Get all the enrolled courses.
     */
    app.get("/v1/payment/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      const result = await paymentsCollection
        .find({ email: email })
        .sort({ transactionDate: -1 })
        .toArray();

      res.send(result);
    });

    /**
     * GET: Get the number of enrolled student for a course.
     */
    app.get("/v1/payment/courses/:id", async (req, res) => {
      const courseId = req.params.id;

      const total = await paymentsCollection.countDocuments({
        courseId: courseId,
      });
      // console.log(result);

      res.send({ total });
    });

    /**
     * POST: Add transaction info in db.
     */
    app.post("/v1/payment", async (req, res) => {
      const payment = req.body;

      const result = await paymentsCollection.insertOne(payment);

      const query = { email: payment.email };
      const options = { upsert: false };
      const updateCourse = {
        $pull: { selectedCourses: new ObjectId(payment.courseId) },
      };

      const removeSelectedCourse = await usersCollection.updateOne(
        query,
        updateCourse,
        options
      );

      if (removeSelectedCourse.acknowledged) {
        res.send(result);
      }
    });
    // Payment collectin API Endpoint End
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
