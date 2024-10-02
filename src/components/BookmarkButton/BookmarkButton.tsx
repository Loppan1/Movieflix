import { useEffect, useState } from "react";
import Button from "../Button/Button";

interface BookmarkButtonProps {
    title: string;
  }

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ title }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        // Check if the movie is already bookmarked when the component loads
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        setIsBookmarked(bookmarks.some((bookmark: any) => bookmark.title === title));
    }, [title])

    const handleBookmark = () => {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

        if (isBookmarked) {
            // Remove the movie from bookmarks
            bookmarks = bookmarks.filter((bookmark: any) => bookmark.title !== title);
        } else {
            // Add the movie to bookmarks
            bookmarks.push({ title });
        }

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        setIsBookmarked(!isBookmarked); // Toggle the bookmark status
    }


    return (
        <>
        <Button onClick={handleBookmark}>
            {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
        </Button>
        </>
    )
}

export default BookmarkButton;