require 'test_helper'

class WelcomeControllerTest < ActionController::TestCase
  test "should get play" do
    get :play
    assert_response :success
  end

  test "should get rules" do
    get :rules
    assert_response :success
  end

  test "should get credits" do
    get :credits
    assert_response :success
  end

end
