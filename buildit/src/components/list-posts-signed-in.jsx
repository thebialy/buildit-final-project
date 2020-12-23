import gql from "graphql-tag";
import { useSubscription } from "@apollo/client"
import { PostListed } from "./post-listed"

const S_GET_POSTS = gql`
    subscription getPostsSignedIn {
        posts {
            id
            title
            description
            created_at
            user_id
            user{
              id
              display_name
            }
            post_upvotes_aggregate {
              aggregate {
                sum {
                  vote_type
                }
              }
            }
        }
    }
`;

export function ListPostsSignedIn() {

    const { loading, error, data } = useSubscription(S_GET_POSTS);
  
    if (loading && !data) {
      return <div> Posts loading...</div>
    }
    if (error) {
      console.error(error)
      return <div>Error loading posts</div>
    }
  
    const { posts } = data;
  
    return (
        <div>
        {posts.map(post => {
          return <PostListed key={post.id} post={post} signedIn={true} />
        })}
        </div>
    )


  }