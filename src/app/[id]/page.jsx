import { notFound } from "next/navigation";
import '../css/characterDetails.css';

export async function generateStaticParams() {
    const posts = await fetch('https://rickandmortyapi.com/api/character').then(   (res) => res.json());
  
    return posts.results.map((post) => ({
      id: String(post.id)
    }));
  }

  export default async function Page({params}){
    const data = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);
    const character = await data.json();
    if(!data){
        notFound()
    }
    return(
        <div className="character-container">
            <img
              src={character.image}
              alt={character.name}
              className="character-image"
            />
            <h1 className="character-name">{character.name}</h1>
            <p className="character-info">Status: {character.status}</p>
            <p className="character-info">Species: {character.species}</p>
            <p className="character-info">Gender: {character.gender}</p>
            <p className="character-info">Origin: {character.origin.name}</p>
        </div>
    )
}