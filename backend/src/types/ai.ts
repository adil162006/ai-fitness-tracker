const generateWorkoutSchema = {
    type:"object",
    required:["exercises","difficuty","explaination"],
    properties:{
        exercises:{
            type:"jsonb",
            description:"Array of exercises with name, sets, reps, weight, rest, and note based on difficulty level and user profile"
        },
        difficulty:{
            type:"string",
            description:"Difficulty level of the workout plan (easy, medium, hard) based on user profile"   
        },
        explaination:{
            type:"string",
            description:"Brief explanation of why the workout plan is suitable for the user's profile and goals"
        }
    }

}

