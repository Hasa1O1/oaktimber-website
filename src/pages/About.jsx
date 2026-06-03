import React from 'react'
import { FaAward, FaHammer, FaHeart, FaLeaf } from 'react-icons/fa'
import EditableText from '../components/EditableText'
import EditableImage from '../components/EditableImage'

function About() {
  const values = [
    {
      icon: <FaHammer className="text-4xl" />,
      title: 'Expert Craftsmanship',
      description: 'Every piece is crafted with precision and care by skilled artisans who take pride in their work.',
    },
    {
      icon: <FaLeaf className="text-4xl" />,
      title: 'Quality Materials',
      description: 'We use only premium materials including maple wood, MDF, and high-grade compressed boards.',
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: 'Customer Focus',
      description: 'Your satisfaction is our priority. We work closely with you to bring your vision to life.',
    },
    {
      icon: <FaAward className="text-4xl" />,
      title: 'Excellence',
      description: 'We are committed to delivering furniture that exceeds expectations in quality and design.',
    },
  ]

  const materials = [
    {
      name: 'Maple Wood',
      description: 'Premium hardwood known for its strength, durability, and beautiful grain patterns.',
    },
    {
      name: 'MDF (Medium Density Fiberboard)',
      description: 'Engineered wood product that provides a smooth, stable surface perfect for painted finishes.',
    },
    {
      name: 'Compressed Wood Boards',
      description: 'Cost-effective and environmentally friendly material suitable for various applications.',
    },
  ]

  const processSteps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'We meet with you to understand your needs, space, and design preferences.',
    },
    {
      number: '02',
      title: 'Design',
      description: 'Our team creates custom designs tailored to your specifications and budget.',
    },
    {
      number: '03',
      title: 'Crafting',
      description: 'Skilled craftsmen bring the design to life using premium materials and techniques.',
    },
    {
      number: '04',
      title: 'Installation',
      description: 'Professional installation ensures perfect fit and finish in your space.',
    },
  ]

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-100 to-accent-cream section-padding">
        <div className="container-custom text-center">
          <h1 className="text-primary-900 mb-6 animate-fade-in">
            <EditableText page="about" section="page_title" defaultValue="About OAKTIMBER" />
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            <EditableText page="about" section="page_intro" defaultValue="Where passion for woodworking meets dedication to quality" />
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <EditableImage
                page="about"
                section="ceo_image"
                defaultValue="/images/CEO image.png"
                alt="Dingani Leonard Peleka - CEO of OAKTIMBER"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-400 rounded-2xl opacity-20 -z-10"></div>
            </div>

            <div className="space-y-6">
              <h2 className="text-primary-900">
                <EditableText page="about" section="story_title" defaultValue="Our Story" />
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <EditableText
                    page="about"
                    section="story_paragraph_1"
                    defaultValue="OAKTIMBER was founded with a simple yet powerful vision: to create beautiful, functional wooden furniture that transforms houses into homes. What started as a passion for woodworking has grown into a thriving carpentry workshop known for quality craftsmanship and attention to detail."
                    multiline
                  />
                </p>
                <p>
                  <EditableText
                    page="about"
                    section="story_paragraph_2"
                    defaultValue="Led by owner Dingani Leonard Peleka, our team of skilled craftsmen combines traditional woodworking techniques with modern design sensibilities. We believe that furniture should be more than just functional - it should tell a story, reflect your personality, and stand the test of time."
                    multiline
                  />
                </p>
                <p>
                  <EditableText
                    page="about"
                    section="story_paragraph_3"
                    defaultValue="From our workshop, we've created countless pieces that have brought joy and functionality to homes and businesses across the region. Each project is approached with fresh enthusiasm and a commitment to excellence that has become our hallmark."
                    multiline
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-primary-900">
                <EditableText page="about" section="mission_title" defaultValue="Our Mission" />
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                <EditableText
                  page="about"
                  section="mission_text"
                  defaultValue="To deliver exceptional handcrafted furniture and custom installations that combine superior craftsmanship, premium materials, and timeless design. We are committed to exceeding our clients' expectations while building lasting relationships based on trust and quality."
                  multiline
                />
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-primary-800 mb-4 text-center">
                <EditableText page="about" section="philosophy_title" defaultValue="Our Craftsmanship Philosophy" />
              </h3>
              <p className="text-gray-700 leading-relaxed text-center">
                <EditableText
                  page="about"
                  section="philosophy_text"
                  defaultValue="We believe that true craftsmanship is about more than just building furniture - it's about creating pieces that enhance your daily life. Every joint, every finish, every detail is carefully considered and expertly executed. We take pride in our work and stand behind every piece that leaves our workshop."
                  multiline
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-primary-900 mb-4">
              <EditableText page="about" section="values_title" defaultValue="Our Core Values" />
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              <EditableText page="about" section="values_intro" defaultValue="The principles that guide everything we do" />
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-4 p-6 rounded-lg hover:bg-primary-50 transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">
              <EditableText page="about" section="materials_title" defaultValue="Materials We Use" />
            </h2>
            <p className="text-primary-200 text-lg max-w-2xl mx-auto">
              <EditableText page="about" section="materials_intro" defaultValue="We carefully select premium materials to ensure durability and beauty" />
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {materials.map((material, index) => (
              <div key={index} className="bg-primary-800 rounded-lg p-6 space-y-3">
                <h3 className="text-xl font-semibold text-primary-100">{material.name}</h3>
                <p className="text-primary-200">{material.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-primary-900 mb-4">
              <EditableText page="about" section="process_title" defaultValue="Our Process" />
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              <EditableText page="about" section="process_intro" defaultValue="From concept to completion - how we bring your vision to life" />
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-primary-50 rounded-lg p-6 space-y-4 h-full hover:shadow-lg transition-shadow">
                  <div className="text-5xl font-bold text-primary-200">{step.number}</div>
                  <h3 className="text-xl font-semibold text-primary-800">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary-300 text-2xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-6">
            <EditableText page="about" section="cta_title" defaultValue="Let's Work Together" />
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            <EditableText page="about" section="cta_text" defaultValue="Ready to start your custom furniture project? Get in touch with us today." />
          </p>
          <a href="/contact" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}

export default About
