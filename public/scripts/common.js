(function() {
    'use strict';

    function displayLoadTime() {
        const loadEndTime = performance.now();
        const loadTime = Math.round(loadEndTime);

        const footer = document.querySelector('footer.contacts');
        if (footer) {
            const loadTimeInfo = document.createElement('p');
            loadTimeInfo.className = 'load-time-info';
            loadTimeInfo.style.fontSize = '0.85em';
            loadTimeInfo.style.color = 'var(--light-green-color)';
            loadTimeInfo.style.marginTop = '10px';
            loadTimeInfo.textContent = `Время загрузки страницы: ${loadTime} мс`;

            const basement = footer.querySelector('.basement');
            if (basement) {
                footer.insertBefore(loadTimeInfo, basement);
            } else {
                footer.appendChild(loadTimeInfo);
            }
        }
    }

    function highlightActiveNavItem() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'major.html';

        const pageMapping = {
            'major.html': 'major.html',
            '': 'major.html',
            'catalog.html': 'catalog.html',
            'basket.html': 'basket.html',
            'booking.html': 'booking.html',
            'authorization.html': 'authorization.html',
            'profile.html': 'profile.html'
        };

        const activePage = pageMapping[currentPage] || currentPage;

        const navLinks = document.querySelectorAll('header nav a, header > a.button');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;

            const linkPage = href.substring(href.lastIndexOf('/') + 1);

            if (linkPage === activePage) {
                link.classList.add('active-page');
            } else {
                link.classList.remove('active-page');
            }
        });
    }

    function addDishInteractivity() {
        const dishButtons = document.querySelectorAll('.dish-item button');

        dishButtons.forEach(button => {
            button.addEventListener('click', function() {
                const dishItem = this.closest('.dish-item');
                const dishName = dishItem.querySelector('.dish-name');
                const dishPrice = dishItem.querySelector('.price strong');

                if (dishName && dishPrice) {
                    alert(`Добавлено в корзину:\n${dishName.textContent}\nЦена: ${dishPrice.textContent}`);
                }
            });
        });
    }

    function initBookingCalendar() {
        const calendarBody = document.querySelector('.schedule-container tbody');
        if (!calendarBody) return;

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        function generateCalendar(year, month) {
            calendarBody.innerHTML = '';

            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();

            let startDay = firstDay.getDay();
            startDay = startDay === 0 ? 6 : startDay - 1;

            let dayCounter = 1;
            let rowCount = Math.ceil((daysInMonth + startDay) / 7);

            for (let week = 0; week < rowCount; week++) {
                const row = document.createElement('tr');

                for (let day = 0; day < 7; day++) {
                    const cell = document.createElement('td');

                    if (week === 0 && day < startDay) {
                        cell.textContent = '';
                    } else if (dayCounter > daysInMonth) {
                        cell.textContent = '';
                    } else {
                        cell.textContent = dayCounter;
                        cell.style.cursor = 'pointer';
                        cell.style.transition = 'all 0.3s ease';

                        const cellDate = new Date(year, month, dayCounter);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        if (cellDate < today) {
                            cell.style.color = '#ccc';
                            cell.style.cursor = 'not-allowed';
                        } else {
                            cell.addEventListener('click', function() {
                                document.querySelectorAll('.schedule-container td').forEach(td => {
                                    td.style.backgroundColor = '';
                                    td.style.fontWeight = '';
                                });

                                this.style.backgroundColor = 'var(--light-green-color)';
                                this.style.fontWeight = 'bold';

                                const selectedDate = `${this.textContent}.${String(month + 1).padStart(2, '0')}.${year}`;
                                const infoReservation = document.querySelector('.info-reservation p:first-child');
                                if (infoReservation) {
                                    infoReservation.textContent = `Выбранная дата: ${selectedDate}`;
                                }
                            });

                            cell.addEventListener('mouseenter', function() {
                                if (cellDate >= today) {
                                    this.style.backgroundColor = 'var(--beige-color)';
                                }
                            });

                            cell.addEventListener('mouseleave', function() {
                                if (!this.style.fontWeight) {
                                    this.style.backgroundColor = '';
                                }
                            });
                        }

                        dayCounter++;
                    }

                    row.appendChild(cell);
                }

                calendarBody.appendChild(row);
            }
        }

        generateCalendar(currentYear, currentMonth);

        const monthDisplay = document.querySelector('.schedule-container nav p');
        let displayedMonth = currentMonth;
        let displayedYear = currentYear;

        const prevButton = document.querySelector('.schedule-container nav button:first-of-type');
        const nextButton = document.querySelector('.schedule-container nav button:last-of-type');

        if (prevButton) {
            prevButton.addEventListener('click', function() {
                displayedMonth--;
                if (displayedMonth < 0) {
                    displayedMonth = 11;
                    displayedYear--;
                }
                updateCalendar();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', function() {
                displayedMonth++;
                if (displayedMonth > 11) {
                    displayedMonth = 0;
                    displayedYear++;
                }
                updateCalendar();
            });
        }

        function updateCalendar() {
            const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
            if (monthDisplay) {
                monthDisplay.textContent = `${months[displayedMonth]} ${displayedYear}`;
            }
            generateCalendar(displayedYear, displayedMonth);
        }
    }

    function initHallSelection() {
        const hallButtons = document.querySelectorAll('.halls-selection button');
        const infoReservation = document.querySelector('.info-reservation p:last-child');

        hallButtons.forEach(button => {
            button.addEventListener('click', function() {
                hallButtons.forEach(btn => {
                    btn.style.backgroundColor = 'var(--beige-color)';
                    btn.style.color = 'var(--dark-green-color)';
                });

                this.style.backgroundColor = 'var(--dark-green-color)';
                this.style.color = 'var(--bone-color)';

                if (infoReservation) {
                    infoReservation.textContent = `Выбранный зал: ${this.textContent}`;
                }
            });
        });
    }

    function init() {
        highlightActiveNavItem();
        addDishInteractivity();
        initBookingCalendar();
        initHallSelection();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.addEventListener('load', displayLoadTime);

})();
