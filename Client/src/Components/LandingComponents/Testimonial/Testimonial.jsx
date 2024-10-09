import React from 'react'
import 'aos/dist/aos.css'
import Aos from 'aos';
import { useEffect } from "react"
const Testimonial = () => {
    useEffect(()=>{
        Aos.init({duration: 2000})
      }, [])
    const testimonials = [
        {
            avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
            name: "Martin escobar",
            title: "Founder of meta",
            quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et est hendrerit, porta nunc vitae."
        },
        {
            avatar: "https://randomuser.me/api/portraits/women/79.jpg",
            name: "Angela stian",
            title: "Product designer",
            quote: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
        },
        {
            avatar: "https://randomuser.me/api/portraits/men/86.jpg",
            name: "Karim ahmed",
            title: "DevOp engineer",
            quote: "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain."
        },
    ]

    return (
        <section className="py-14">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
                <div className="max-w-xl space-y-3">
                    <h3 data-aos="zoom-in-left" className="text-customplam font-semibold">
                        Testimonials
                    </h3>
                    <p data-aos="zoom-in-right" className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        What our customers says about.
                    </p>
                    {/*<p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius
    </p>*/}
                </div>
                <div className="mt-12">
                    <ul data-aos="zoom-in" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            testimonials.map((item, idx) => (
                                <li key={idx} className="bg-white p-4 border border-gray-800 rounded-lg">
                                    <figure>
                                        <div className="flex items-center gap-x-4">
                                            <img src={item.avatar} className="w-16 h-16 rounded-full" />
                                            <div>
                                                <span className="block text-gray-800 font-semibold">{item.name}</span>
                                                <span className="block text-gray-600 text-sm mt-0.5">{item.title}</span>
                                            </div>
                                        </div>
                                        <blockquote>
                                            <p className="mt-6 text-gray-700">
                                                {item.quote}
                                            </p>
                                        </blockquote>
                                    </figure>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Testimonial