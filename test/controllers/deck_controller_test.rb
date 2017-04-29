require 'test_helper'

class DeckControllerTest < ActionController::TestCase
  test "should get build" do
    get :build
    assert_response :success
  end

  test "should get generate" do
    get :generate
    assert_response :success
  end

  test "should get shuffle" do
    get :shuffle
    assert_response :success
  end

  test "should get assign" do
    get :assign
    assert_response :success
  end

  test "should get point_sum" do
    get :point_sum
    assert_response :success
  end

end
