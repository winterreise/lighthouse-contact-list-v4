class Contact < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true, length: { minimum: 1 }
  validates :email, presence: true, uniqueness: true, length: { minimum: 1 }
end
