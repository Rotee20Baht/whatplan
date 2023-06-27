import styles from "./pageContainer.module.css"
export default function PageContainer({children}) {
    return(
        <div className={styles.container}>
            {children}
        </div>
    )
}