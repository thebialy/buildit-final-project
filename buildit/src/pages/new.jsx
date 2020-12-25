import { useState } from "react";
import { Layout, Main } from "components/layout"
import gql from 'graphql-tag'
import { useRouter } from "next/router"
import { useMutation } from '@apollo/client' 

const INSERT_POST = gql`
mutation insertPost($post: posts_insert_input!){
  insert_posts(objects: [$post]) {
    affected_rows
  }
}
`

export default function New() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const [createPost] = useMutation(INSERT_POST);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await createPost({
        variables: {
          post: {
            title,
            description
          }
        }
      })     
    } catch (error) {
      console.error('Insert post failed')
      return console.error(error);
    }
    router.push("/");
  }

  return <Layout>
    <Main>
    <div>
      <form onSubmit={handleSubmit}>
        <div className="py-2">
          <input 
            type="text" 
            placeholder="Title" 
            className="border rounded px-2 py-1 my-2 w-full"
            value={title} 
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="py-2">
          <textarea 
            type="text" 
            placeholder="Description" 
            className="border rounded px-2 py-1 my-2 w-full"
            value={description} 
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className= "py-2 flex justify-center">
          <button className="bg-indigo-700 text-white px-4 py-2 text-sm">POST</button>
        </div>
      </form>
    </div>
    </Main>
  </Layout>
}
