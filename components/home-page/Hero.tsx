import Image from 'next/image'
import styles from './Hero.module.css'
const Hero = () => {
  return (
    <section className={styles.hero}>
        <div className={styles.image}>
            <Image src="/images/site/alina.png" alt="An image showing Alina" width={300} height={300} />
        </div>
        <h1>Hi, I&apos;m Alina</h1>
        <p>
            I blog about web development - especially frontend frameworks like React.
        </p>
    </section>
  )
}

export default Hero
