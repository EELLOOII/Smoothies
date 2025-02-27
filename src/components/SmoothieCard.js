import { Link } from "react-router-dom"
import supabase from "../config/supabaseClient"

const SmoothieCard = ({ smoothie, onDelete }) => {

    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('smoothies')
            .delete()
            .eq('id', smoothie.id)
            .select()

        if (error) {
            console.error('Error deleting smoothie:', error)
            return

        } if (data) {
            console.log('Data is Successfully Deleted:', data)
            onDelete(smoothie.id)
        }
            
    }
    return (
        <div className="smoothie-card">
            <h3>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
            <p>Added at: {new Date(smoothie.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div className="rating">{smoothie.rating}</div>
            <div className="buttons">
                <Link to={`/${smoothie.id}`}>
                    <i className="material-icons">edit</i>                    
                </Link>
                    <i className="material-icons" onClick={handleDelete}>delete</i>
            </div>
        </div>
    )
}

export default SmoothieCard