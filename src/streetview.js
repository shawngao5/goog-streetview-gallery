/**
 * Copyright (c) 2015 jguinto <uxcodes@gmail.com>
 * MIT License
 * @author jguinto
 */

goog.provide('google.visualization.Query');
goog.provide('sv.Gallery');

goog.require('goog.dom');
goog.require('goog.dom.DomHelper');
goog.require('goog.dom.classes');
goog.require('goog.events.EventHandler');



/**
 * Street View gallery constructor.
 * @param {!Object.<string, string>} data JSON collection of panos.
 * @constructor
 */
sv.Gallery = function(data) {
  /** @private {!Object.<string, string>} */
  this.data_ = data;

  /** @private {!goog.dom.DomHelper} */
  this.dom_ = new goog.dom.DomHelper();

  this.init_();
};
goog.exportSymbol('sv.Gallery', sv.Gallery);


/** @private {!NodeList} The gallery containing the Street Views. */
sv.Gallery.prototype.gallery_ = goog.dom.getElementByClass('gallery');


/** @private {!NodeList} The gallery navigation. */
sv.Gallery.prototype.galleryNav_ = goog.dom.getElementByClass('gallery-nav');


/** @private {number} The Street View selected to view. */
sv.Gallery.prototype.selectedGalleryIndex_ = 0;


/**
 * Initializes the creation of the gallery DOM and the click listener on nav.
 * @private
 */
sv.Gallery.prototype.init_ = function() {
  this.buildGallery_();
  this.handler_ = new goog.events.EventHandler(this);
  this.handler_.listen(this.galleryNav_, 'click', function(e) {
    var target = e.target;
    if (goog.dom.classes.has(target, 'nav-item')) {
      this.handleNavClick_(target);
    }
  });
};


/**
 * Builds the Street View gallery and navigation.
 * @private
 */
sv.Gallery.prototype.buildGallery_ = function() {
  var items = this.data_.table.rows;
  for (var i = 1; i < items.length; i++) {
    var place = items[i].c[0].v;
    var streetview = items[i].c[1].v;
    streetview = this.dom_.htmlToDocumentFragment(streetview);
    // If no place or streetview, throw an error.
    var navItem = this.dom_.createElement('li');
    var navClassNames = i === 1 ? 'nav-item active' : 'nav-item';
    goog.dom.classes.add(navItem, navClassNames);
    this.dom_.setTextContent(navItem, place);
    this.dom_.appendChild(this.galleryNav_, navItem);

    var galleryItem = this.dom_.createElement('li');
    var galleryClassNames = i === 1 ? 'gallery-item active' : 'gallery-item';
    goog.dom.classes.add(galleryItem, galleryClassNames);
    var h2 = this.dom_.createElement('h2');
    this.dom_.setTextContent(h2, place);
    this.dom_.appendChild(galleryItem, h2);
    this.dom_.appendChild(galleryItem, streetview);
    this.dom_.appendChild(this.gallery_, galleryItem);

    this.navItems_ = this.dom_.getElementsByClass('nav-item');
    this.galleryItems_ = this.dom_.getElementsByClass('gallery-item');
  }
};


/**
 * Handles the a click event on the navigation.
 * @param {!Element} navItemClicked
 * @private
 */
sv.Gallery.prototype.handleNavClick_ = function(navItemClicked) {
  var targetIndex;
  var currItem;
  for (var i = 0; i < this.navItems_.length; i++) {
    currItem = this.navItems_[i];
    if (currItem === navItemClicked) {
      this.changeGalleryDisplay_(i);
    }
  }
};


/**
 * Changes the gallery display.
 * @param {number} newSelectedIndex
 * @private
 */
sv.Gallery.prototype.changeGalleryDisplay_ = function(newSelectedIndex) {
  var prevSelectedIndex = this.selectedGalleryIndex_;
  var prevSelectedGallery = this.galleryItems_[prevSelectedIndex];
  goog.dom.classes.remove(this.navItems_[prevSelectedIndex],
      'active');
  goog.dom.classes.remove(this.galleryItems_[prevSelectedIndex],
      'active');
  var newSelectedGallery = this.galleryItems_[newSelectedIndex];
  goog.dom.classes.add(this.navItems_[newSelectedIndex],
      'active');
  goog.dom.classes.add(this.galleryItems_[newSelectedIndex],
      'active');
  this.selectedGalleryIndex_ = newSelectedIndex;
};


/**
 * Creates a new Street View gallery as a callback when Google Sheets API
 * successfully responds with data.
 * @param {!Object.<string, string>} data JSON info of a spreadsheet.
 */
google.visualization.Query.setResponse = function(data) {
  new sv.Gallery(data);
};
