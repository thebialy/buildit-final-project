import React, { useState } from "react";
import { useRouter } from "next/router"
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client"

import { Layout, Main } from "components/layout"

const GET_POST = gql`
    query getPost($post_id: uuid!) {
        post: posts_by_pk(id: $post_id) {
            id
            title
            description
        }
    }
`

const UPDATE_POST = gql`
mutation updatePost($post_id: uuid!, $post: posts_set_input!) {
    update_posts_by_pk(pk_columns: { id: $post_id }, _set: $post) {
        id
        title
        description
    }
}
`

function EditPost ({post}) {

    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const router = useRouter();

    const [updatePost] = useMutation(UPDATE_POST)

    async function handleSubmit(event) {
        event.preventDefault();

        try{
            await updatePost({
                variables: {
                    post_id: post.id,
                    post: {
                        title,
                        description,
                    },
                },
            })
        } catch (error) {
            console.error(error);
            return alert("failed to update post")
        }
        router.push("/")
    }

    return (
        <Layout>
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
                            <button className="btn bg-black text-white px-4 py-2">EDIT</button>
                        </div>
                    </form>
                </div>
            </Main>
        </Layout>
    )
}

export default function Edit() {
    const router = useRouter();
    const { slug } = router.query

    const { loading, error, data } = useQuery(GET_POST, {
        variables: {
            post_id: slug,
        }
    })

    if (loading) {
        return <div>Loading....</div>
    }

    if (error) {
        return <div>Error...</div>
    }

    const { post } = data


    return <EditPost post={post} />
}