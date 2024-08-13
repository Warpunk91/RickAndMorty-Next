import Link from "next/link";
import '../app/css/style.css';

export default async function Home() {
  const data = await getData();

  return (
    <div>
        <h1>Rick and Morty</h1>
        <ul>
          {data.results.map((character) => (
            <li key={character.id}>
              <Link href={`/${character.id}`}>
              <img src={character.image} alt={character.name} />
              <h2>{character.name}</h2></Link>
            </li>
          ))}
        </ul>
      </div>
  );
}

async function getData() {
  try {
      const res = await fetch('https://rickandmortyapi.com/api/character');
      if(!res.ok){
          throw new Error('Hubo un error en la red');
      }
      const posts = await res.json();
      return posts
  } catch (error) {
      console.error(error);
  }    
}
