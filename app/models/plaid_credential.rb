class PlaidCredential < ApplicationRecord

  attr_accessor :link_token, :access_token, :item_id, :cursor
  belongs_to :user

  def to_s
    "Link: #{link_token}, Access: #{access_token}, Item: #{item_id}, Cursor: #{cursor}"
  end

end
