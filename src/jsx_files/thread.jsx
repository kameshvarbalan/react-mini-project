import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoggedInUser } from '../util/localStorage';
import '../css_files/thread.css';
import Reddit from '../images/fun.png'

function Thread() {
    const [isLoggedIn, username] = useLoggedInUser();
    const navigate = useNavigate();
    const postInputRefs = useRef({});
    const [thread, setThread] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    useEffect(() => {
        if (isLoggedIn === 'no') {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        const storedThreads = JSON.parse(sessionStorage.getItem('threads'));
        if (storedThreads) {
            setThread(storedThreads);
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('threads', JSON.stringify(thread));
    }, [thread]);

    const handleChange = function (event) {
        setNewPost(event.target.value);
    };

    const addPost = function () {
        if (!newPost.trim()) {
            alert('Post Content Empty');
            return;
        } else if (postInputRefs.current && !toggleSubmit) {
            setThread(
                thread.map((task) => {
                    if (task.postID === isEditItem) {
                        return { ...task, contents: newPost };
                    }
                    return task;
                })
            );

            setToggleSubmit(true);
            setNewPost('');
            setIsEditItem(null);
        } else {
            const feed = {
                postID: thread.length === 0 ? 1 : thread[thread.length - 1].postID + 1,
                contents: newPost,
                author: username,
                createdOn: Date(Date.now()).toString().substring(0, 21),
                updatedOn: Date.now(),
                likedBy: [],
                liked: false,
                comments: [],
            };
            setThread([...thread, feed]);
        }
        setNewPost('');
    };

    const deletePost = (postID) => {
        const newthread = thread.filter((post) => post.postID !== postID);
        setThread(newthread);
    };

    const editItem = (id) => {
        let newEditItem = thread.find((elem) => elem.postID === id);
        setToggleSubmit(false);
        setNewPost(newEditItem.contents);
        setIsEditItem(id);
    };

    const likedBtn = (postId) => {
        setThread(
            thread.map((item) => {
                if (item.postID === postId) {
                    const alreadyLiked = item.likedBy.includes(username);
                    if (alreadyLiked) {
                        return { ...item, likedBy: item.likedBy.filter((user) => user !== username) };
                    } else {
                        return { ...item, likedBy: [...item.likedBy, username] };
                    }
                }
                return item;
            })
        );
    };    
    
    const handleComment = (postId, comment) => {
        setThread(
            thread.map((post) => {
                if (post.postID === postId) {
                    return { ...post, comments: [...(post.comments || []), comment] };
                }
                return post;
            })
        );
    };

    const addComment = (postId) => {
        const commentText = postInputRefs.current[postId].value;
        if (!commentText.trim()) {
            alert('Comment Content Empty');
            return;
        }
        handleComment(postId, { author: username, content: commentText });
        postInputRefs.current[postId].value = '';
    };

    return (
        <div className="feed-container">
            <div className="intro">
                <div className="welcome">
                    <h1>Hello {username}</h1>
                    <h2 className="quote">Thread your Thoughts and dive into Conversations</h2>
                </div>
                <div className="feed-post">
                    <h2>Create New Thread</h2>
                    <div className="post-content">
                        <textarea
                            className={`post-textarea ${toggleSubmit ? 'original-post' : ''}`}
                            placeholder="What's threading..."
                            type="text"
                            value={newPost}
                            ref={(el) => (postInputRefs.current['post'] = el)}
                            maxLength="300"
                            onChange={handleChange}
                        />
                        <div className="button-container">
                            {toggleSubmit ? (
                                <button className="post-button" onClick={addPost}>
                                    Create Thread
                                </button>
                            ) : (
                                <button className="post-button" onClick={addPost}>
                                    Edit Thread
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="feed">My Feed</h2>
            {thread.length === 0 && (
                <div className="empty-feed">
                    <p>Your feed is empty</p>
                    <div className="empty-image">
                        <p>Create New Thread ...?</p>
                        <img src={Reddit} alt="new Thread" className="empty-logo"></img>
                    </div>
                </div>
            )}
            <div className="post-list">
                {thread.map((task) => (
                    <div className="post-item" key={task.postID}>
                        <div className="post-details">
                            <div className="post-header">
                                <h3 className="author">Posted by u/{task.author}</h3>
                                <p className="timestamp">{task.createdOn}</p>
                                <div className="post-button-container">
                                    {username === task.author && (
                                        <>
                                            <button onClick={() => deletePost(task.postID)}>Delete</button>
                                            <button onClick={() => editItem(task.postID)}>Edit</button>
                                        </>
                                    )}
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={() => likedBtn(task.postID)} className={task.likedBy.includes(username) ? 'like-button active' : 'like-button'}>
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                        <text x="5" y="14" fontSize="7" fill="rgb(0, 42, 255)">Like</text>
                                    </svg>
                                </div>
                            </div>
                            <div className={`post-content ${toggleSubmit ? 'original-post' : ''}`}>
                                {task.contents.split(' ').map((word, index) => {
                                    if (word.startsWith('#')) {
                                        return <span key={index} className="hashtag">{word} </span>;
                                    }
                                    return word + ' ';
                                })}
                            </div>
                            <h4>Comments :</h4>
                            <div className="comments-section">
                                {task.comments && task.comments.map((comment, index) => (
                                        <div key={index} className="comment">
                                            <p>u/{comment.author}</p>
                                            <p>{comment.content}</p>
                                        </div>
                                    ))}
                                <textarea
                                    className="comment-textarea"
                                    placeholder="Add a comment..."
                                    ref={(el) => (postInputRefs.current[task.postID] = el)}
                                />
                                <button className="comment-button" onClick={() => addComment(task.postID)}>
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Thread;
