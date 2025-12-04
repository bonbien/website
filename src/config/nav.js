import { ui } from '../i18n/ui.js';

export const getNav = (lang = 'en') => {
	const t = (key) => ui[lang]?.[key] || ui['en'][key];
	const prefix = lang === 'en' ? '' : `/${lang}`;

	return [
		{
			title: t('nav.home'),
			slug: prefix === '' ? '/' : prefix,
		},
		{
			title: t('nav.about'),
			slug: `${prefix}/#about`,
		},
		{
			title: t('nav.contact'),
			slug: `${prefix}/#contact`,
		},
	];
};
