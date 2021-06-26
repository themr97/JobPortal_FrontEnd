import React from 'react'
import './index.css'

const Home = () => {
    return (
        <div>
            <section id="Banner" class="content-section">
                <div class="container content-wrap text-center">
                    <h1>Job Portal</h1>
                    <h3>
                        <em>Find the best job in the market!</em>
                    </h3>
                    <a class="btn btn-primary btn-xl smooth-scroll" href="/signup">Signup Now!</a>
                </div>
                <div class="overlay"></div>
            </section>
        </div>
    )
}

export default Home
