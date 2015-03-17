/**
 * Copyright (c) 2015 jguinto <uxcodes@gmail.com>
 * MIT License
 * @author jguinto
 */

goog.provide('sv.Gallery');
goog.provide('google.visualization.Query');

goog.require('goog.dom');
goog.require('goog.dom.DomHelper');
goog.require('goog.dom.classes');
goog.require('goog.events.EventHandler');



/**
 * Street View gallery constructor.
 * @constructor
 */
sv.Gallery = function(data) {
  this.data_ = data;
  this.init_();
};
goog.exportSymbol('sv.Gallery', sv.Gallery);


sv.Gallery.prototype.dom_ = new goog.dom.DomHelper();


sv.Gallery.prototype.gallery_ = goog.dom.getElement('gallery');


sv.Gallery.prototype.galleryNav_ = goog.dom.getElement('gallery-nav'); 


sv.Gallery.prototype.selectedGalleryIndex_ = 0;


sv.Gallery.prototype.init_ = function() {
  this.buildModule_();
  this.handler_ = new goog.events.EventHandler(this);
  this.handler_.listen(this.galleryNav_, 'click', function(e) {
    var target = e.target;
    if (goog.dom.classes.has(target, 'nav-item')) {
      this.handleNavClick_(target);
    }
  });
};


sv.Gallery.prototype.buildModule_ = function() {
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


google.visualization.Query.setResponse = function(data) {
  new sv.Gallery(data);
};

