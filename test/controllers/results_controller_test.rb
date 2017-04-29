require 'test_helper'

class ResultsControllerTest < ActionController::TestCase
  test "should get display" do
    get :display
    assert_response :success
  end

  test "should get mod_help" do
    get :mod_help
    assert_response :success
  end

  test "should get reshuffle" do
    get :reshuffle
    assert_response :success
  end

end
