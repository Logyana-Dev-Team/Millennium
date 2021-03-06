//jshint esversion:6
const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const flash = require("connect-flash");
var fs = require("fs");
var path = require("path");
var multer = require("multer");
var request = require("request");
const moment = require("moment");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000, //1 hour
    },
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  "mongodb+srv://admin-shubham:suman@20@cluster0.lzrwf.mongodb.net/millenniumDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

mongoose.set("useCreateIndex", true);

const imageSchema = new mongoose.Schema({
  filename: String,
});

const Image = new mongoose.model("Image", imageSchema);

const adminSchema = new mongoose.Schema({
  name: String,
  lname: String,
  email: String,
  password: String,
  phone: String,
});

adminSchema.plugin(passportLocalMongoose);
adminSchema.plugin(findOrCreate);
adminSchema.index({ unique: false });

const Admin = new mongoose.model("Admin", adminSchema);
passport.use("admin", Admin.createStrategy());

const homePageSchema = new mongoose.Schema(
  {
    banner1: [{ img: [imageSchema] }],
    banner2: String,
    section1image1: String,
    section1image2: String,
    sec1textheader: String,
    sec1texpara: String,
    section2text1: String,
    section2Text2: String,
    section2VideoLink: String,
    thumbnail: String,
  },
  { timestamps: true }
);

const Homepage = new mongoose.model("Homepage", homePageSchema);

const apartmentSchema = new mongoose.Schema(
  {
    banner1: String,
    pdf: String,
    bannerText: String,
    section1Header: String,
    section1para: String,
    section1img1: String,
    section1img2: String,
    projName: String,
    flatType: [
      {
        typeName: String,
        img: [imageSchema],
        fpimg: [imageSchema],
      },
    ],
    section2Text2: String,
    spot1: String,
    spot1info: String,
    spot2: String,
    spot2info: String,
    spot3: String,
    spot3info: String,
    spot4: String,
    spot4info: String,
    section2img: String,
  },
  { timestamps: true }
);

const Apartment = new mongoose.model("Apartment", apartmentSchema);

const prevApartmentSchema = new mongoose.Schema(
  {
    banner1: String,
    pdf: String,
    bannerText: String,
    section1Header: String,
    section1para: String,
    section1img1: String,
    section1img2: String,
    projName: String,
    flatType: [
      {
        typeName: String,
        img: [imageSchema],
        fpimg: [imageSchema],
      },
    ],
    section2Text2: String,
    spot1: String,
    spot1info: String,
    spot2: String,
    spot2info: String,
    spot3: String,
    spot3info: String,
    spot4: String,
    spot4info: String,
    section2img: String,
  },
  { timestamps: true }
);

const PrevApartment = new mongoose.model("PrevApartment", prevApartmentSchema);

const userSchema = new mongoose.Schema(
  {
    name: String,
    mobile: String,
    email: String,
    date: String,
    time: String,
    projName: String,
    message: String,
  },
  { timestamp: true }
);

const User = new mongoose.model("User", userSchema);

const careerSchema = new mongoose.Schema(
  {
    name: String,
    mobileNo: String,
    email: String,
    department: String,
    experience: String,
    resume: String,
  },
  { timestamp: true }
);

const Career = new mongoose.model("Career", careerSchema);

const gallerySchema = new mongoose.Schema(
  {
    image: String,
    text: String,
  },
  { timestamp: true }
);

const Gallery = new mongoose.model("Gallery", gallerySchema);

const departmentSchema = new mongoose.Schema(
  {
    department: String,
  },
  { timestamp: true }
);

const Department = new mongoose.model("Department", departmentSchema);

passport.serializeUser(function (admin, done) {
  done(null, admin.id);
});

passport.deserializeUser(function (id, done) {
  Admin.findById(id, function (err, admin) {
    done(err, admin);
  });
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets/img/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

var upload = multer({ storage: storage });

app.get("/", async function (req, res) {
  const homepage = await Homepage.findById({ _id: "6035e9c6871e8d1b201362ab" });
  const apartment = await Apartment.find({});
  const banner1 = homepage.banner1;
  const [banner1imgs] = banner1.map((src, index) => {
    return src.img;
  });
  res.render("index", {
    homepage: homepage,
    apartment: apartment,
    banner1imgs: banner1imgs,
  });
});

app.get("/about-us", async function (req, res) {
  const homepage = await Homepage.findById({ _id: "6035e9c6871e8d1b201362ab" });
  res.render("about-us", { homepage: homepage });
});

app.get("/projects", async function (req, res) {
  const apartment = await Apartment.find({});
  res.render("apartments", { apartment: apartment });
});

app.get("/previous-projects", async function (req, res) {
  const apartment = await PrevApartment.find({});
  res.render("prevApartment", { apartment: apartment });
});

app.get("/gallery", async function (req, res) {
  const gallery = await Gallery.find({});
  var errorMsg = req.flash("error")[0];
  res.render("gallery", { gallery: gallery, errorMsg });
});

app.get("/careers", async (req, res) => {
  const departments = await Department.find({});
  var errorMsg = req.flash("error")[0];
  res.render("careers", { department: departments, errorMsg });
});

app.get("/contact-us", async function (req, res) {
  const apartment = await Apartment.find({});
  res.render("contact-us", { apartment: apartment });
});

app.get("/admin", function (req, res) {
  var errorMsg = req.flash("error")[0];
  res.render("admin/adminLogin", { errorMsg });
});

app.get("/adminDashboard", async function (req, res) {
  const apartment = await Apartment.find({});
  const users = await User.find({});
  const completeApartments = await PrevApartment.find({});
  const userCount = users.length;
  const completeApartmentsCount = completeApartments.length;
  const apartmentCount = apartment.length;
  res.render("admin/adminDashboard", {
    users: users,
    apartmentCount: apartmentCount,
    completeApartmentsCount: completeApartmentsCount,
    userCount: userCount,
  });
});

app.get("/userTable", async (req, res) => {
  const users = await User.find({});
  res.render("admin/userTable", {
    users: users,
  });
});

app.get("/editHome", async function (req, res) {
  const homepage = await Homepage.findById({ _id: "6035e9c6871e8d1b201362ab" });
  var errorMsg = req.flash("error")[0];
  res.render("admin/editHome", { homepage: homepage, errorMsg });
});

app.get("/editGallery", async function (req, res) {
  const gallery = await Gallery.find({});
  var errorMsg = req.flash("error")[0];
  res.render("admin/gallery", { gallery: gallery, errorMsg });
});

app.get("/addProject", function (req, res) {
  var errorMsg = req.flash("error")[0];
  res.render("admin/addProject", { errorMsg });
});

app.get("/editProject", async function (req, res) {
  const apartment = await Apartment.find({});
  const apartmentCount = apartment.length;
  let date = apartment.map((apartments) => {
    return moment(apartments.updatedAt).format("Do MMMM");
  });
  res.render("admin/editProject", {
    apartment: apartment,
    date,
    apartmentCount,
  });
});

app.get("/previousProjects", async function (req, res) {
  const apartment = await PrevApartment.find({});
  const apartmentCount = apartment.length;
  let date = apartment.map((apartments) => {
    return moment(apartments.updatedAt).format("Do MMMM");
  });
  res.render("admin/previousProjects", {
    apartment: apartment,
    date,
    apartmentCount,
  });
});

app.get("/editSingleApartment/:id", async function (req, res) {
  var errorMsg = req.flash("error")[0];
  const singleApartment = await Apartment.findById(req.params.id, {});
  console.log(singleApartment);
  const flatType = singleApartment.flatType;
  const [flatTypeimg] = flatType.map((src, index) => {
    return src.img;
  });
  res.render("admin/editSingleApartment", {
    singleApartment: singleApartment,
    flatType: flatType,
    flatTypeimg: flatTypeimg,
    errorMsg,
  });
});

app.get("/careerEnquiries", async (req, res) => {
  var errorMsg = req.flash("error")[0];
  const careerEnquiry = await Career.find({});
  const departments = await Department.find({});
  res.render("admin/careerEnquiries", {
    careerEnquiry: careerEnquiry,
    department: departments,
  });
});

app.get("/apartment/:id/", async function (req, res) {
  const singleApartment = await Apartment.findById(req.params.id, {});
  const flatType = singleApartment.flatType;
  const [flatTypeimg] = flatType.map((src, index) => {
    return src.img;
  });
  const [flatTypeimgfp] = flatType.map((src, index) => {
    return src.fpimg;
  });
  res.render("apartment-item/apartment", {
    singleApartment: singleApartment,
    flatType: flatType,
    flatTypeimg: flatTypeimg,
    flatTypeimgfp: flatTypeimgfp,
  });
});

app.get("/prevApartment/:id/", async function (req, res) {
  const singleApartment = await PrevApartment.findById(req.params.id, {});
  const flatType = singleApartment.flatType;
  const [flatTypeimg] = flatType.map((src, index) => {
    return src.img;
  });
  const [flatTypeimgfp] = flatType.map((src, index) => {
    return src.fpimg;
  });
  res.render("apartment-item/apartment", {
    singleApartment: singleApartment,
    flatType: flatType,
    flatTypeimg: flatTypeimg,
    flatTypeimgfp: flatTypeimgfp,
  });
});

app.post("/contactFrom", async (req, res) => {
  user = new User({
    name: req.body.yourName,
    mobile: req.body.yourMobile,
    email: req.body.yourEmail,
    date: req.body.yourDate,
    time: req.body.yourTime,
    projName: req.body.project,
    message: req.body.yourMessage,
  });
  user.save(function (err, data) {
    if (err) {
      return handleError(err);
    } else {
      console.log(data);
      res.redirect(req.get("referer"));
    }
  });
});

app.post(
  "/editHome",
  upload.fields([
    {
      name: "banner1",
      maxCount: 3,
    },
    {
      name: "banner2",
      maxCount: 2,
    },
    {
      name: "section1image1",
      maxCount: 1,
    },
    {
      name: "section1image2",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  (req, res, next) => {
    var errorMsg = req.flash("error")[0];
    const banner1 = req.files.banner1;
    const banner2 = req.files.banner2[0];
    const section1image1 = req.files.section1image1[0];
    const section1image2 = req.files.section1image2[0];
    const thumbnail = req.files.thumbnail[0];
    let banner1imgs = [];

    const sec1textheader = req.body.sec1textheader;
    const sec1texpara = req.body.sec1texpara;
    const section2text1 = req.body.section2text1;
    const section2Text2 = req.body.section2Text2;
    const section2VideoLink = req.body.section2VideoLink;

    if (banner1 !== undefined) {
      banner1.map((src, index) => {
        let finalImg = {
          filename: req.files.banner1[index].filename,
        };
        let newUpload = new Image(finalImg);
        banner1imgs.push(newUpload);
      });
    }

    const obj = {
      banner1: [{ img: banner1imgs }],
      banner2: banner2.filename,
      section1image1: section1image1.filename,
      section1image2: section1image2.filename,
      sec1textheader: sec1textheader,
      sec1texpara: sec1texpara,
      section2text1: section2text1,
      section2Text2: section2Text2,
      section2VideoLink: section2VideoLink,
      thumbnail: thumbnail.filename,
    };
    console.log(obj);
    Homepage.findOneAndUpdate(
      { _id: "6035e9c6871e8d1b201362ab" },
      { $set: obj },
      { new: true },
      (err, item) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/editHome");
        }
      }
    );
  }
);

app.post(
  "/addProject",
  upload.fields([
    {
      name: "banner1",
      maxCount: 1,
    },
    {
      name: "pdf",
      maxCount: 1,
    },
    {
      name: "section1img1",
      maxCount: 1,
    },
    {
      name: "section1img2",
      maxCount: 1,
    },
    {
      name: "section2img",
      maxCount: 1,
    },
  ]),
  async function (req, res) {
    const bannerText = req.body.bannerText;
    const section1Header = req.body.section1Header;
    const section1para = req.body.section1para;
    const projName = req.body.projName;
    const section2Text2 = req.body.section2Text2;
    const spot1 = req.body.spot1;
    const spot1info = req.body.spot1info;
    const spot2 = req.body.spot2;
    const spot2info = req.body.spot2info;
    const spot3 = req.body.spot3;
    const spot3info = req.body.spot3info;
    const spot4 = req.body.spot4;
    const spot4info = req.body.spot4info;
    const banner1 = req.files.banner1[0].filename;
    const pdf = req.files.pdf[0].filename;
    const section1img1 = req.files.section1img1[0].filename;
    const section1img2 = req.files.section1img2[0].filename;
    const section2img = req.files.section2img[0].filename;

    obj = {
      banner1: banner1,
      pdf: pdf,
      bannerText: bannerText,
      section1Header: section1Header,
      section1para: section1para,
      section1img1: section1img1,
      section1img2: section1img2,
      projName: projName,
      section2Text2: section2Text2,
      spot1: spot1,
      spot1info: spot1info,
      spot2: spot2,
      spot2info: spot2info,
      spot3: spot3,
      spot3info: spot3info,
      spot4: spot4,
      spot4info: spot4info,
      section2img: section2img,
    };
    console.log(obj);

    Apartment.create(obj, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        console.log(item);
        res.redirect("/editProject");
      }
    });
  }
);

app.post(
  "/addTypes/:id",
  upload.fields([
    {
      name: "flatImages",
      maxCount: 5,
    },
    {
      name: "flatFloorPlanimg",
      maxCount: 5,
    },
  ]),
  async (req, res) => {
    const flatTypeName = req.body.flatTypeName;
    const flatImages = req.files.flatImages;
    const flatFloorPlanimg = req.files.flatFloorPlanimg;
    let flatImage = [];
    let flatFloorPlanImage = [];

    if (flatImages !== undefined) {
      flatImages.map((src, index) => {
        let finalImg = {
          filename: req.files.flatImages[index].filename,
        };
        let newUpload = new Image(finalImg);
        flatImage.push(newUpload);
      });
    }
    if (flatFloorPlanimg !== undefined) {
      flatFloorPlanimg.map((src, index) => {
        let finalImg = {
          filename: req.files.flatFloorPlanimg[index].filename,
        };
        let newUpload = new Image(finalImg);
        flatFloorPlanImage.push(newUpload);
      });
    }

    console.log(flatTypeName);
    console.log(flatImage);
    console.log(flatFloorPlanImage);

    const obj = {
      typeName: flatTypeName,
      img: flatImage,
      fpimg: flatFloorPlanImage,
    };

    Apartment.findByIdAndUpdate(
      { _id: req.params.id },
      { $addToSet: { flatType: obj } },
      { upsert: true },
      (err, item) => {
        if (err) {
          console.log(err);
        } else {
          console.log(item);
          res.redirect(req.get("referer"));
        }
      }
    );
  }
);

app.post(
  "/editSingleApartment/:id",
  upload.fields([
    {
      name: "banner1",
      maxCount: 1,
    },
    {
      name: "pdf",
      maxCount: 1,
    },
    {
      name: "section1img1",
      maxCount: 1,
    },
    {
      name: "section1img2",
      maxCount: 1,
    },
    {
      name: "section2img",
      maxCount: 1,
    },
  ]),
  async function (req, res) {
    const bannerText = req.body.bannerText;
    const pdfLink = req.body.pdfLink;
    const section1Header = req.body.section1Header;
    const section1para = req.body.section1para;
    const projName = req.body.projName;
    const section2Text2 = req.body.section2Text2;
    const spot1 = req.body.spot1;
    const spot1info = req.body.spot1info;
    const spot2 = req.body.spot2;
    const spot2info = req.body.spot2info;
    const spot3 = req.body.spot3;
    const spot3info = req.body.spot3info;
    const spot4 = req.body.spot4;
    const spot4info = req.body.spot4info;
    const banner1 = req.files.banner1[0].filename;
    const pdf = req.files.pdf[0].filename;
    const section1img1 = req.files.section1img1[0].filename;
    const section1img2 = req.files.section1img2[0].filename;
    const section2img = req.files.section2img[0].filename;

    obj = {
      banner1: banner1,
      pdf: pdf,
      bannerText: bannerText,
      section1Header: section1Header,
      section1para: section1para,
      section1img1: section1img1,
      section1img2: section1img2,
      projName: projName,
      section2Text2: section2Text2,
      spot1: spot1,
      spot1info: spot1info,
      spot2: spot2,
      spot2info: spot2info,
      spot3: spot3,
      spot3info: spot3info,
      spot4: spot4,
      spot4info: spot4info,
      section2img: section2img,
    };
    console.log(obj);

    Apartment.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: obj },
      (err, item) => {
        if (err) {
          console.log(err);
        } else {
          console.log(item);
          res.redirect("/editProject");
        }
      }
    );
  }
);

app.post("/careerFrom", upload.single("resume"), async (req, res) => {
  obj = {
    name: req.body.yourName,
    mobileNo: req.body.yourMobile,
    email: req.body.yourEmail,
    department: req.body.department,
    experience: req.body.experience,
    resume: req.file.filename,
  };
  console.log(obj);

  Career.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      console.log(item);
      res.redirect("/careers");
    }
  });
});

app.post("/editGallery", upload.single("image"), async (req, res) => {
  obj = {
    image: req.file.filename,
    text: req.body.text,
  };
  console.log(obj);
  Gallery.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      console.log(item);
      res.redirect("/editGallery");
    }
  });
});

app.post("/editGalleryImageText/:id", async (req, res) => {
  const galleryId = req.params.id;
  obj = {
    text: req.body.text,
  };
  console.log(obj);
  Gallery.findByIdAndUpdate({ _id: galleryId }, obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      console.log(item);
      res.redirect("/editGallery");
    }
  });
});

app.post("/addDepartment", (req, res) => {
  obj = {
    department: req.body.department,
  };
  console.log(obj);
  Department.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      console.log(item);
      res.redirect("/careerEnquiries");
    }
  });
});

app.post("/removeDepartment", async function (req, res) {
  Department.findByIdAndRemove({ _id: req.body.deptId }, (err) => {
    if (err) {
      console.log(err);
    } else {
      if (err) {
        res.json({ msg: "error" });
      } else {
        res.json({ msg: "success" });
      }
    }
  });
});

app.post("/deleteGalleryImage", async function (req, res) {
  Gallery.findByIdAndRemove({ _id: req.body.imageId }, (err) => {
    if (err) {
      console.log(err);
    } else {
      if (err) {
        res.json({ msg: "error" });
      } else {
        res.json({ msg: "success" });
      }
    }
  });
});

app.post("/deleteApartment", async function (req, res) {
  Apartment.findByIdAndRemove({ _id: req.body.apartId }, (err) => {
    if (err) {
      console.log(err);
    } else {
      if (err) {
        res.json({ msg: "error" });
      } else {
        res.json({ msg: "success" });
      }
    }
  });
});

app.post("/deletePrevApartment", async function (req, res) {
  PrevApartment.findByIdAndRemove({ _id: req.body.apartId }, (err) => {
    if (err) {
      console.log(err);
    } else {
      if (err) {
        res.json({ msg: "error" });
      } else {
        res.json({ msg: "success" });
      }
    }
  });
});

app.post("/removeUser", async function (req, res) {
  User.findByIdAndRemove({ _id: req.body.userId }, (err) => {
    if (err) {
      console.log(err);
    } else {
      if (err) {
        res.json({ msg: "error" });
      } else {
        res.json({ msg: "success" });
      }
    }
  });
});

app.post("/removeFlatType", async (req, res) => {
  Apartment.findByIdAndUpdate(
    { _id: req.body.apartId },
    { $pull: { flatType: { _id: req.body.typeId } } },
    (err, item) => {
      if (err) {
        console.log(err);
      } else {
        if (err) {
          res.json({ msg: "error" });
        } else {
          res.json({ msg: "success" });
        }
      }
    }
  );
});

app.post("/moveToPrevious", async function (req, res) {
  const apartId = req.body.apartId;
  const apartment = await Apartment.findById({ _id: req.body.apartId }, {});
  obj = {
    banner1: apartment.banner1,
    pdf: apartment.pdf,
    bannerText: apartment.bannerText,
    section1Header: apartment.section1Header,
    section1para: apartment.section1para,
    section1img1: apartment.section1img1,
    section1img2: apartment.section1img2,
    flatType: apartment.flatType,
    projName: apartment.projName,
    section2Text2: apartment.section2Text2,
    spot1: apartment.spot1,
    spot1info: apartment.spot1info,
    spot2: apartment.spot2,
    spot2info: apartment.spot2info,
    spot3: apartment.spot3,
    spot3info: apartment.spot3info,
    spot4: apartment.spot4,
    spot4info: apartment.spot4info,
    section2img: apartment.section2img,
  };
  console.log(obj);
  PrevApartment.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      Apartment.deleteOne({ _id: apartId }, function (err, result) {
        if (err) {
          res.json({ msg: "error" });
        } else {
          res.json({ msg: "success" });
        }
      });
    }
  });
});

app.post(
  "/adminLogin",
  [
    passport.authenticate("admin", {
      failureRedirect: "/adminLogin",
      failureFlash: true,
    }),
  ],
  function (req, res) {
    const user = new Admin({
      username: req.body.username,
      password: req.body.password,
    });

    req.login(user, function (err) {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("admin")(req, res, function () {
          res.redirect("/adminDashboard");
        });
      }
    });
  }
);

app.post("/register", function (req, res) {
  Admin.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
      }
    }
  );
});

app.use(function (req, res) {
  res.status(404).render("404");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
  console.log("Server started successfully on port 3000");
}
app.listen(port);
