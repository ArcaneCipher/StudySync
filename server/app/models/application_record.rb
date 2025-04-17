# == ApplicationRecord ==
#
# This is the base class for all Active Record models in the application.
# It inherits from ActiveRecord::Base, and is marked as an abstract class.
#
# The `primary_abstract_class` macro:
# - Declares this model as an abstract class (same as `self.abstract_class = true`)
# - Signals to Rails that this is the primary superclass for your app's models
# - Helps with autoloading, prevents accidental inheritance from other abstract base classes
#
# All models should inherit from this class (e.g., User < ApplicationRecord)
#
# Introduced in Rails 7, this is the modern and recommended approach.
#
# References:
# https://api.rubyonrails.org/classes/ActiveRecord/Base.html#method-c-primary_abstract_class

class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
end
