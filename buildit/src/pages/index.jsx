import { Layout, Main } from "components/layout"
import gql from "graphql-tag";
import { useQuery } from "@apollo/client"
import { useAuth } from "react-nhost";

import { ListPostsSignedIn } from 'components/list-posts-signed-in'
import { ListPostsSignedOut } from 'components/list-posts-signed-out'

export default function Home() {
  const { signedIn } = useAuth()

  return (
    <Layout>
      <Main> 
        {signedIn ? <ListPostsSignedIn/> : <ListPostsSignedOut/>} 
      </Main>
    </Layout>
  )
}
