class CardsController < ApplicationController
  # before_action :set_student, only: [:show, :edit, :update, :destroy]
  # before_action :authenticate_user!


  def cards
  end
  
  # GET /students
  # GET /students.json
  def cards
    @cards = Card.all #Not sure if these need to be Card or Cards, etc
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @cards }
    end
  end

  # def create
  #   @cards = Card.find(params[:name]) #Do we even need thjis
  #   @card.align = new_align #don't need this?
    
  #   respond_to do |format|
  #     if @card.save
  #       format.html { redirect_to @card, notice: 'card was successfully created.' }
  #       format.json { render :index, status: :created, location: @card }
  #     else
  #       format.html { render :new }
  #       format.json { render json: @comment.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # GET /students/1
  # GET /students/1.json
  def show
    @card = Card.find(params[:id])
  end


  # # GET /students/new
  # def new
  #   @student = Student.new
  #   @range = Student.year_range
  # end

  # # GET /students/1/edit
  # def edit
  #   @student = Student.find(params[:id])
  #   @range = Student.year_range
  # end

  # # POST /students
  # # POST /students.json
  # def create
  #   @student = Student.new(student_params)
    
  #   respond_to do |format|
  #     if @student.save
  #       format.html { redirect_to @student, notice: 'Student was successfully created.' }
  #       format.json { render :show, status: :created, location: @student }
  #     else
  #       format.html { render :new }
  #       format.json { render json: @student.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # # PATCH/PUT /students/1
  # # PATCH/PUT /students/1.json
  # def update
  #   respond_to do |format|
  #     if @student.update(student_params)
  #       format.html { redirect_to @student, notice: 'Student was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @student }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @student.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # # DELETE /students/1
  # # DELETE /students/1.json
  # def destroy
  #   @student.destroy
  #   respond_to do |format|
  #     format.html { redirect_to students_url, notice: 'Student was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  # private
  #   # Use callbacks to share common setup or constraints between actions.
  #   def set_student
  #     @student = Student.find(params[:id])
  #   end

  #   # Never trust parameters from the scary internet, only allow the white list through.
  #   def student_params
  #     params.require(:student).permit(:school_id, :school_year, :first_name, :last_name, :age, :date_of_birth, :current_grade_level, :student_id_number, :classroom_teacher, :ethnicity, :free_or_reduced_lunch, :primary_language, :parent_id)
  #   end
    
   
    
end
