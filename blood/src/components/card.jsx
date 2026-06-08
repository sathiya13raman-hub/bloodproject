function Card(props)
{
    return(
        <div className="cards">
            <h2>{props.title}</h2>
            <p>{props.info}</p>
        </div>
    )

}
export default Card