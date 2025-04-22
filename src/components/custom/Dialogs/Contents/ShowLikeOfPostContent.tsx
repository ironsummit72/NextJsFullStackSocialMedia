import { clientapi } from '@/lib/api'
import { UserData } from '@/types';
import React, { useEffect, useState } from 'react'
import SuggessionCard from '../../Cards/SuggessionCard';
type Props = {
    postId: string
}
function ShowLikeOfPostContent({ postId }: Props) {
    const [data, setData] = useState<UserData[]>();
    useEffect(() => {
        async function getLikes() {
            clientapi.get(`/post/likes/${postId}`).then((res) => {
                setData(res.data.data.likes);
                console.log("like data from like dialog", res.data.data.likes);

            }).catch((err) => {
                console.log(err);
            })
        }
        getLikes()
    }, [])
    return (
        <div>
            {data?.map((userdata) => <SuggessionCard key={userdata._id} username={userdata.username} />)}
        </div>
    )
}

export default ShowLikeOfPostContent