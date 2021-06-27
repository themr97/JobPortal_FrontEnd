import React from 'react'
import './index.css'

const Home = () => {
    return (
        <div>
            <section id="Banner" className="content-section">
                <div className="container content-wrap text-center">
                    <h1>Job Portal</h1>
                    <h3>
                        <em>Find the best job in the market!</em>
                    </h3>
                    <a className="btn btn-primary btn-xl smooth-scroll" href="/signup">Signup Now!</a>
                </div>
                <div className="overlay"></div>
            </section>
        </div>
    )
}

export default Home
