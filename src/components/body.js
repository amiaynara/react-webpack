import React, { Component, useState } from 'react';

class Body extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            posts: [],
        }
        
        // Bind methods
        this._loadUsers = this._loadUsers.bind(this);
        this._loadPosts = this._loadPosts.bind(this);
    }

    componentDidMount() {
        //this._loadUsers();
        //this._loadPosts();
    }
	render() {
        const { posts, users } = this.state;
		return (
            <div>
                <button>Users</button>
                <button onClick={this._loadUsers}>users</button>
                <button onClick={this._loadPosts}>posts</button>
                <table>
                    <thead>
                    {posts && posts.map((post) => (
                            <tr key={post.id}><td>{post.id}</td><td>{post.type || 'Normal'}</td><td>{post.author}</td></tr>
                        )
                    )}
                    </thead>
                </table>
                The blogs are : <br />{posts.map((post) => <li key={post.id}>{post.content}</li>)}
                The users are : <br />{users.map((user) => <li key={user.username}>{user.username}</li>)}
            </div>
		);
	}

    /**
     * Helper to get users
     */
    async _loadPosts() {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const res = await fetch("http://localhost:8000/api/v1/blog/posts/?type=premium", {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            const blogsData = await res.json();
            this.setState({ posts: blogsData });
        }
    }

    /**
     * Helper to load posts
     */
    async _loadUsers() {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const res = await fetch("http://localhost:8000/api/v1/users/user/", {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            const userData = await res.json();
            this.setState({ users: userData });
        }
    }
}

export default Body;
