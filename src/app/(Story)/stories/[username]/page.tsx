'use client'
import { clientapi } from "@/lib/api";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";


type StoryDataType = {
    _id: string,
    user: {
        _id: string, username: string, email: string,
        firstName: string,
        lastName: string,
        displayPicturePath: string,
    },
    contentPath: {
        fieldname: string,
        originalname: string,
        encoding: string,
        mimetype: string,
        size: number
        filename: string,
        path: string
    },
    likes: [],
    seenBy: []
    createdAt: string
}

const StoriesPage = () => {
    const params = useParams();
    const { username } = params;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(true);

    const [storyData, setStoryData] = useState<StoryDataType[]>()
    const router = useRouter()




    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % storyData?.length!);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? storyData?.length! - 1 : prev - 1
        );
    };

    const handleClose = () => {
        router.push('/')
    };

    useEffect(() => {
        clientapi.get('story/stories/' + username).then((res) => {
            setStoryData(res.data.data)
        })
    }, [username])

    useEffect(() => {
        const handleKeyDown = (e:KeyboardEvent) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    if (!isOpen) return null;

    const currentStory = storyData?.[currentIndex];

    

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center text-white">
            <button
                onClick={handleClose}
                className="absolute top-4 right-6 text-3xl font-bold"
            >
                ×
            </button>

          {storyData &&  <div className="w-[360px] h-[640px] bg-black flex items-center justify-center rounded-xl overflow-hidden">
                {currentStory?.contentPath.mimetype.split("/")[0] == "image" ? (
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/content/streamstories/image/${currentStory?.contentPath.filename}`}
                        alt="story"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <video
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/content/streamstories/video/${currentStory?.contentPath.filename}`}
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover"
                    />
                )}
            </div>}

            <div className="absolute bottom-10 flex justify-between w-[360px]">
                <button
                    onClick={handlePrev}
                    className="bg-gray-700 px-4 py-2 rounded-lg"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="bg-gray-700 px-4 py-2 rounded-lg"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default StoriesPage;
