(function() {
    'use strict';

    const USERS_API_URL = 'https://jsonplaceholder.typicode.com';
    const GUESTS_COUNT = 10;

    let guestsContainer;
    let preloader;
    let errorContainer;
    let loadButton;
    let guestTemplate;

    function initElements() {
        guestsContainer = document.getElementById('guests-container');
        preloader = document.getElementById('guests-preloader');
        errorContainer = document.getElementById('guests-error');
        loadButton = document.getElementById('load-guests-btn');
        guestTemplate = document.getElementById('guest-template');
    }

    function showPreloader() {
        if (preloader) {
            preloader.style.display = 'block';
        }
        if (errorContainer) {
            errorContainer.style.display = 'none';
        }
        if (guestsContainer) {
            guestsContainer.style.display = 'none';
        }
    }

    function hidePreloader() {
        if (preloader) {
            preloader.style.display = 'none';
        }
    }

    function showError(errorType, message) {
        hidePreloader();
        if (errorContainer) {
            errorContainer.style.display = 'block';
            errorContainer.className = `guests-error-message error-${errorType}`;

            const errorTitle = errorContainer.querySelector('.error-title');
            const errorText = errorContainer.querySelector('.error-text');

            if (errorTitle) {
                errorTitle.textContent = getErrorTitle(errorType);
            }
            if (errorText) {
                errorText.textContent = message;
            }
        }
        if (guestsContainer) {
            guestsContainer.style.display = 'none';
        }
    }

    function getErrorTitle(errorType) {
        const titles = {
            'network': 'Ошибка сети',
            'api': 'Ошибка API',
            'resource': 'Ресурс не найден',
            'unknown': 'Неизвестная ошибка'
        };
        return titles[errorType] || titles['unknown'];
    }

    function hideError() {
        if (errorContainer) {
            errorContainer.style.display = 'none';
        }
    }

    function showGuests() {
        if (guestsContainer) {
            guestsContainer.style.display = 'block';
        }
    }

    async function getRandomUsers(count) {
        try {
            const userIds = [];
            while (userIds.length < count) {
                const randomId = Math.floor(Math.random() * 10) + 1;
                if (!userIds.includes(randomId)) {
                    userIds.push(randomId);
                }
            }

            const userPromises = userIds.map(async (userId) => {
                const response = await fetch(`${USERS_API_URL}/users/${userId}`);
                if (!response.ok) {
                    return null;
                }
                return await response.json();
            });

            const users = await Promise.all(userPromises);
            return users.filter(user => user !== null);
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    function getUserName(userData) {
        if (!userData || !userData.name) {
            return { firstName: 'Unknown', lastName: 'User' };
        }

        const nameParts = userData.name.split(' ');
        return {
            firstName: nameParts[0] || 'Unknown',
            lastName: nameParts.slice(1).join(' ') || 'User'
        };
    }

    function createGuestElement(guestData, index) {
        if (!guestTemplate) return null;

        const templateContent = guestTemplate.content.cloneNode(true);
        const guestItem = templateContent.querySelector('.guest-item');

        if (guestItem) {
            const guestName = guestItem.querySelector('.guest-name');
            const guestNumber = guestItem.querySelector('.guest-number');

            if (guestName) {
                guestName.textContent = `${guestData.firstName} ${guestData.lastName}`;
            }

            if (guestNumber) {
                guestNumber.textContent = `${index + 1}.`;
            }
        }

        return guestItem;
    }

    function displayGuests(guests) {
        if (!guestsContainer) {
            return;
        }

        guestsContainer.innerHTML = '';

        guests.forEach((guest, index) => {
            const guestElement = createGuestElement(guest, index);
            if (guestElement) {
                guestsContainer.appendChild(guestElement);
            }
        });

        showGuests();
        hidePreloader();
        hideError();
    }

    async function loadGuests() {
        showPreloader();

        try {
            const users = await getRandomUsers(GUESTS_COUNT);

            if (!users || users.length === 0) {
                throw new Error('RESOURCE_NOT_FOUND');
            }

            const guests = users.map((user) => {
                return getUserName(user);
            });

            displayGuests(guests);

        } catch (error) {
            let errorType = 'unknown';
            let errorMessage = 'Произошла неизвестная ошибка';

            console.error('Error loading guests:', error);

            if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
                errorType = 'network';
                errorMessage = 'Не удалось подключиться к серверу. Проверьте подключение к интернету.';
            } else if (error.message === 'RESOURCE_NOT_FOUND' || error.message.includes('No users')) {
                errorType = 'resource';
                errorMessage = 'Данные не найдены. Попробуйте загрузить еще раз.';
            } else if (error.message.includes('HTTP error') || error.message.includes('status:')) {
                errorType = 'api';
                const statusMatch = error.message.match(/status: (\d+)/);
                const status = statusMatch ? statusMatch[1] : 'неизвестен';
                errorMessage = `Ошибка сервера API (код: ${status}). Попробуйте позже.`;
            } else {
                errorMessage = error.message || errorMessage;
            }

            showError(errorType, errorMessage);
        }
    }

    function init() {
        initElements();

        if (loadButton) {
            loadButton.addEventListener('click', loadGuests);
        }

        const retryButton = errorContainer ? errorContainer.querySelector('.retry-button') : null;
        if (retryButton) {
            retryButton.addEventListener('click', function() {
                if (loadButton) {
                    loadButton.click();
                }
            });
        }
    }

    window.addEventListener('load', function() {
        setTimeout(init, 200);
    });

})();
