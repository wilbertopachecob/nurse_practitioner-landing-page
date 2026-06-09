import { Trans, useTranslation } from 'react-i18next';
import { FaExclamationTriangle } from 'react-icons/fa';

const CrisisNotice: React.FC = () => {
  const { t } = useTranslation();

  return (
    <aside className="crisis-notice container" role="note" aria-label={t('crisis.title')}>
      <span className="crisis-ico" aria-hidden="true">
        <FaExclamationTriangle />
      </span>
      <div className="crisis-body">
        <b>{t('crisis.title')}</b>
        <p>
          <Trans i18nKey="crisis.body" components={{ b: <strong /> }} />
        </p>
      </div>
    </aside>
  );
};

export default CrisisNotice;
