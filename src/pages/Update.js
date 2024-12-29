import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('Please fill out all fields')
      return
    }

    const updatedSmoothie = {
      title,
      method,
      rating: parseInt(rating)
    }

    const { data, error } = await supabase
      .from('smoothies')
      .update([updatedSmoothie])
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating smoothie:', error)
      setFormError('Error updating smoothie')
      return
    } 
    if (data) {
      console.log('Data is Successfully Updated:', data)
      setFormError(null)
      navigate('/')
    }
  }

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate("/", { replace: true })
      }

      if (data) {
        console.log(data)
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
      }
    }

    fetchSmoothie()
  },[id, navigate])

  return (
    <div className="page update">
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

        <button>Update Smoothie</button>

        {formError && (<p className="error">{formError}</p>)}
      </form>
    </div>
  )
}

export default Update