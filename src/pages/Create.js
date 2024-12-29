import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import supabase from "../config/supabaseClient"

const Create = () => {

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('Please fill out all fields')
      return
    }
    
    const newSmoothie = {
      title,
      method,
      rating: parseInt(rating)
    }

    console.log('Inserting new smoothie:', newSmoothie)

    const { data, error } = await supabase
      .from('smoothies')
      .insert([newSmoothie])
      .select()

    console.log('Supabase response:', { data, error })

    if (error) {
      console.error('Error inserting new smoothie:', error)
      setFormError('Error inserting new smoothie')
      return
    }

    if (data) {
      console.log('Data is Successfully Inserted:', data)
      setFormError(null)
      navigate("/");
    }

    setTitle('')
    setMethod('')
    setRating('')
    setFormError(null)
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        />

        <label htmlFor="method">Method:</label>
        <input
          type="text"
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)} 
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)} 
        />

        <button>Create Smoothie Recipe</button>

        {formError && (<p className="error">{formError}</p>)}
      </form>
    </div>
  )
}

export default Create