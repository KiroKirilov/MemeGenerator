import * as React from 'react';
import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useFirestore } from 'react-redux-firebase';
import { collectionNames } from '../../../common/constants/collection-names';
import { UserMetadata } from '../../../models/user/user-metadata';
import { MemeList } from '../../memes/meme-list/meme-list';
import { MemeOperations } from '../../memes/meme-operations/meme-operations';
import { MemeViewer } from '../../memes/meme-viewer/meme-viewer';
import Title from 'antd/lib/typography/Title';
import Avatar from 'react-avatar';
import { UserAvatar } from '../user-avatar/user-avatar';
import { useSelector } from 'react-redux';
import { ReduxStore } from '../../../types/redux-store';
import { ImageUploader } from '../../misc/image-uploader/image-uploader';

export const UserProfile: React.FC = memo(() => {
    const { userId } = useParams();
    const [user, setUser] = useState<UserMetadata | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const firestore = useFirestore();
    const auth = useSelector((store: ReduxStore) => store.firebase.auth);
    const currentUserId = auth.uid;

    useEffect(() => {
        loadUserById();
    }, [userId])

    async function loadUserById() {
        try {
            const userRef = await firestore.collection(collectionNames.userProfiles).doc(userId).get();
            const userData = userRef.data() as any;
            setUser({
                id: userRef.id,
                username: userData.username,
                avatarUrl: userData.avatarUrl
            });
            setIsLoading(false);
        } catch (error) {
            setUser(undefined);
            setIsLoading(false);
        }
    }

    return (
        <div>
            {
                user
                    ? <div>
                        <div style={{ textAlign: "center" }}>
                            <Title style={{ textAlign: "center" }}>
                                <UserAvatar style={{ marginRight: "10px" }} userMetadata={user} /><b>{user.username}'s</b> profile
                            </Title>

                            {
                                user.id === currentUserId
                                    ? <div style={{marginBottom: 20}}><ImageUploader buttonText="Choose a different avatar" /></div>
                                    : null
                            }
                        </div>
                        <MemeViewer userId={userId} />
                    </div>
                    : null
            }
        </div>
    );
});