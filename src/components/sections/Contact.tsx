import Accordion from '@/components/shared/Accordion'
import Section from '@/components/shared/Section'
import { cb } from '@/lib/cx'
import { Person, Wedding } from '@/models/wedding'
import styles from './Contact.module.scss'
const cx = cb(styles)

interface Props {
  groom: Wedding['groom']
  bride: Wedding['bride']
}
export default function Contact({ groom, bride }: Props) {
  return (
    <Section title="연락처 및 마음 전하실 곳">
      <Accordion label="신랑측">
        <ContextInfo
          name={groom.name}
          account={groom.account}
          phoneNumber={groom.phoneNumber}
        />
        {groom.parents.map((parent, index) => (
          <ContextInfo
            key={index}
            name={parent.name}
            account={parent.account}
            phoneNumber={parent.phoneNumber}
          />
        ))}
      </Accordion>
      <Accordion label="신부측">
        <ContextInfo
          name={bride.name}
          account={bride.account}
          phoneNumber={bride.phoneNumber}
        />
        {bride.parents.map((parent, index) => (
          <ContextInfo
            key={index}
            name={parent.name}
            account={parent.account}
            phoneNumber={parent.phoneNumber}
          />
        ))}
      </Accordion>
    </Section>
  )
}

function ContextInfo({ name, account, phoneNumber }: Person) {
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('클립보드에 복사되었습니다.')
    } catch (e) {
      alert('복사에 실패하였습니다')
    }
  }
  return (
    <div className={cx('wrap-contact')}>
      <div className={cx('wrap-contact-info')}>
        <span>{`${account.bankName} | ${account.accountNumber}`}</span>
        <span>{name}</span>
      </div>

      <ul className={cx('wrap-buttons')}>
        <li>
          <a href={`tel: ${phoneNumber}`} className={cx('button')}>
            전화
          </a>
        </li>
        <li>
          <button
            className={cx('button')}
            onClick={() =>
              handleCopy(`${account.bankName} ${account.accountNumber}`)
            }
          >
            복사
          </button>
        </li>
        {account.kakaopayLink !== undefined ? (
          <li>
            <a
              href={account.kakaopayLink}
              className={cx('button')}
              target="_blank"
              rel="noreferrer"
            >
              송금
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  )
}
