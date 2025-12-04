import { ui } from '../i18n/ui.js';

export const footerSocials = []

export const getFooterLists = (lang = 'ko') => {
	const t = (key) => ui[lang]?.[key] || ui['ko'][key];
	const prefix = lang === 'ko' ? '' : `/${lang}`;

	return [
		{
			title: t('footer.info'),
			items: [
				{
					title: t('footer.about'),
					slug: `${prefix}/#about`,
				},
				{
					title: t('footer.contact'),
					slug: `${prefix}/#contact`,
				},
			],
		},
	];
};
