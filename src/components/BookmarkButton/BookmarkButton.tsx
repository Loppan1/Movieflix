import { useEffect, useState } from "react";
import Button from "../Button/Button";
import bookRemove from "../../assets/book-red.png"
import bookAdd from "../../assets/book-redblack.png"
import "./BookmarkButton.css"

interface BookmarkButtonProps {
    title: string;
    type: string
  }

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ title, type }) => {
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

    let remove = (type === "text") ? 
        <Button onClick={handleBookmark}>Remove Bookmark</Button> : 
        <button onClick={handleBookmark} className="bookmark-button"><img src={bookRemove} className="bookmark-image"  /></button>;
    let add = (type === "text") ? 
        <Button onClick={handleBookmark}>Bookmark</Button> :
        <button onClick={handleBookmark} className="bookmark-button"><img src={bookAdd} className="bookmark-image"  /></button>;

    return (
        <>
        {isBookmarked ? remove : add}
        </>
    )
}

export default BookmarkButton;