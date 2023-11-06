const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});

router.route("/")
.get( wrapAsync(listingController.index))    // index route
.post( isLoggedIn,                 // create route //create a new Route to submite form details for new.ejs 
    upload.single("listing[image]"),
    validateListing, 
    wrapAsync(listingController.createListing)
    );


//NEW ROUTE 
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")                 //show route
.get(wrapAsync(listingController.showListing)
)
.put(                            //update route
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete(                          //destroy route
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.destroyListing));
  

//edit route 
router.get("/:id/edit", 
    isLoggedIn, 
    isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports = router;

