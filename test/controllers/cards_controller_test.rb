require 'test_helper'

class CardsControllerTest < ActionController::TestCase
  test "should get details" do
    get :details
    assert_response :success
  end

end
