export default function initTekjamHandler() {
    const url = new URL(window.location.href);
    if (url.hostname !== 'www.tekjam.com' || !url.pathname.startsWith('/album/')) return;

    const style = document.createElement('style');
    style.textContent = `
        .photos-list {
            column-count: 4 !important;
        }

        [data-aview="large"] .photos-list {
            column-count: auto !important;
        }

        .photos-list > * {
            break-inside: avoid;
        }

        @media (max-width: 1199px) {
            .photos-list {
                column-count: 3 !important;
            }

            [data-aview="large"] .photos-list {
                column-count: auto !important;
            }
        }

        @media (max-width: 991px) {
            span.view-toggle.d-only {
                display: inline-flex !important;
            }
        }

        @media (max-width: 767px) {
            .photos-list {
                column-count: 2 !important;
            }

            [data-aview="large"] .photos-list {
                column-count: auto !important;
            }
        }
    `;
    (document.head || document.documentElement).appendChild(style);
}
