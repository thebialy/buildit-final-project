import React from "react";
import Link from "next/link"
import { SvgArrowUp, SvgArrowDown, SvgEdit, SvgDelete } from 'components/svg'
import { auth } from "utils/nhost";
import gql from 'graphql-tag'
import { useMutation } from "@apollo/client"

const DELETE_POST = gql`
    mutation deletePost($post_id: uuid!) {
        delete_posts_by_pk(id: $post_id) {
            id
        }
    }
`

const UPSERT_POST_VOTE = gql`
    mutation upsertPostVote($post_vote: post_votes_insert_input!) {
        insert_post_votes_one(
            object: $post_vote 
            on_conflict: {
                constraint: post_upvotes_post_id_user_id_key
                update_columns: vote_type
            }
        ) {
            id
        }
    }
`

export function PostListed({ post, signedIn }) {

    const [deletePost] = useMutation(DELETE_POST);
    const [upsertPostVote] = useMutation(UPSERT_POST_VOTE);

    return (
    <div className="terminal space shadow">    
        <div className="terminal-top">
            <div className="terminal-btns">
                <span className="circle red"></span>
                <span className="circle yellow"></span>
                <span className="circle green"></span>
            </div>
            <div className="terminal-title">{post.user.display_name} -- -bash -- 70x32 </div>
        </div>
        <div className="flex post-container bg-black">

            <div className="flex flex-col items-center pl-3 pb-1 pt-1 pr-5 vote-container">
                <div>
                    <div 
                        className="cursor-pointer bg-gray-700 hover:bg-green-700 rounded-full hover:text-white"
                        onClick={async () => {
                            try{
                                await upsertPostVote({
                                    variables: {
                                        post_vote: {
                                            post_id: post.id,
                                            vote_type: 1,
                                        }
                                    }
                                })
                            } catch (error) {
                                console.error(error)
                                return alert("Must login to upvote")
                            }
                        }}
                    >
                        <SvgArrowUp />
                    </div>
                </div>
                <div className="py-4 text-gray-700">
                    {post.post_upvotes_aggregate.aggregate.sum.vote_type 
                    ? post.post_upvotes_aggregate.aggregate.sum.vote_type 
                    : 0}
                </div>
                <div>
                    <div 
                        className="cursor-pointer bg-gray-700 hover:bg-red-700 rounded-full hover:text-white"
                        onClick={async () => {
                            try{
                                await upsertPostVote({
                                    variables: {
                                        post_vote: {
                                            post_id: post.id,
                                            vote_type: -1,
                                        }
                                    }
                                })
                            } catch (error) {
                                console.error(error)
                                return alert("Must login to downvote")
                            }
                        }}
                    >
                        <SvgArrowDown />
                    </div>
                </div>
            </div>
            <div className="post-body">
                <div className="text-3xl font-semibold">{post.title}</div>
                <hr/>
                <div className="py-4">{post.description}</div>
                {signedIn && post.user_id === auth.getClaim("x-hasura-user-id") && (

                <div className="flex flex-row-reverse">
                    <div>
                        <Link href={`/post/${post.id}/edit`}>
                            <a>
                                <SvgEdit />
                            </a>
                        </Link>
                    </div>
                    <div className="px-4">
                        <div 
                            className="cursor-pointer"
                            onClick={async () => {
                                console.log("post deleted");
                                try{
                                    await deletePost({
                                        variables: {
                                            post_id: post.id,
                                        },
                                    })
                                } catch (error) {
                                    console.error(error);
                                    return alert("failed to delete")
                                }
                            }}
                        >
                            <SvgDelete />
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    </div>
    )
}