import './styles/styles.scss';
import './styles/menu.scss';
import './styles/swiper.scss';
import './styles/uslogui.scss';
import './styles/price.scss';
import './styles/footer.scss';
import './styles/feedback.scss';
import './styles/768.scss';
import './styles/1120.scss';
import * as $ from 'swiper'

document.addEventListener("DOMContentLoaded", () => {
    // Load initial menu for large screens
    const mediaQuery = window.matchMedia('(min-width: 1120px)');
    const feedbackDialogContainer = document.getElementById('feedbackDialogContainer');

    const handleFeedbackDialog = () => {
        fetch('feedback.html')
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.text();
            })
            .then(feedbackHtml => {
                if (feedbackDialogContainer) {
                    feedbackDialogContainer.innerHTML = feedbackHtml;
                    const feedbackDialog = document.querySelector('.feedbackContainer');

                    if (feedbackDialog) {
                        // Show the dialog
                        feedbackDialog.showModal();

                        // Apply animation after a small delay to ensure the dialog is rendered
                        setTimeout(() => {
                            feedbackDialog.style.transform = 'translateX(0)';
                        }, 10);

                        // Handle close button
                        const closeButton = feedbackDialog.querySelector('.feedbckCacelbutton');
                        if (closeButton) {
                            closeButton.addEventListener('click', () => {
                                // Animate out
                                feedbackDialog.style.transform = 'translateX(100%)';

                                // Close after animation completes
                                setTimeout(() => {
                                    feedbackDialog.close();
                                }, 300);
                            });
                        }

                        // Handle click outside dialog
                        feedbackDialog.addEventListener('click', (e) => {
                            const dialogDimensions = feedbackDialog.getBoundingClientRect();
                            if (
                                e.clientX < dialogDimensions.left ||
                                e.clientX > dialogDimensions.right ||
                                e.clientY < dialogDimensions.top ||
                                e.clientY > dialogDimensions.bottom
                            ) {
                                // Animate out
                                feedbackDialog.style.transform = 'translateX(100%)';

                                // Close after animation completes
                                setTimeout(() => {
                                    feedbackDialog.close();
                                }, 300);
                            }
                        });

                        // Handle form submission
                        const form = feedbackDialog.querySelector('form');
                        if (form) {
                            form.addEventListener('submit', (e) => {
                                e.preventDefault();
                                // Handle form submission logic here

                                // Animate out
                                feedbackDialog.style.transform = 'translateX(100%)';

                                // Close after animation completes
                                setTimeout(() => {
                                    feedbackDialog.close();
                                }, 300);
                            });
                        }
                    }
                }
            })
            .catch(error => {
                console.error('Error loading feedback content:', error);
            });
    };

    const handleMenuForLargeScreens = (e) => {
        if (e.matches) {
            loadMenu(true);
        } else {
            // Clean up menu when screen becomes smaller
            const menuContainer = document.getElementById('menuContainer');
            if (menuContainer) {
                menuContainer.innerHTML = '';
            }
        }
    };

    const loadMenu = (isLargeScreen = false) => {
        fetch('menu.html')
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.text();
            })
            .then(html => {
                const menuContainer = document.getElementById('menuContainer');
                menuContainer.innerHTML = html;

                // Initialize the feedback button
                const feedbackButton = document.getElementById('feedbackButton');
                if (feedbackButton) {
                    feedbackButton.addEventListener('click', () => {
                        const dialogWrapper = document.getElementById('dialogWrapper');
                        const sideMenu = document.getElementById('sideMenu');
                        if (dialogWrapper) dialogWrapper.classList.remove('active');
                        if (sideMenu) sideMenu.close();
                        handleFeedbackDialog();
                    });
                }

                const sideMenu = document.getElementById('sideMenu');
                const dialogWrapper = document.getElementById('dialogWrapper');
                if (!isLargeScreen) {
                    dialogWrapper.classList.add('active');
                    sideMenu.show();

                    const closeBtn = document.getElementById('closeMenu');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', () => {
                            dialogWrapper.classList.remove('active');
                            sideMenu.close();
                        });
                    }

                    dialogWrapper.addEventListener('click', (e) => {
                        if (e.target === dialogWrapper) {
                            dialogWrapper.classList.remove('active');
                            sideMenu.close();
                        }
                    });
                } else {
                    // For large screens
                    if (dialogWrapper) dialogWrapper.classList.add('active');
                    if (sideMenu) {
                        sideMenu.setAttribute('open', '');
                        sideMenu.show();
                    }
                }
            })
            .catch(error => {
                console.error("Error fetching menu:", error);
            });
    };

    // Initial check for large screens
    if (mediaQuery.matches) {
        loadMenu(true);
    }

    // Listen for screen size changes
    mediaQuery.addEventListener('change', handleMenuForLargeScreens);

    // Handle menu button click for mobile
    const menuButton = document.getElementById('menuButton');
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            if (!mediaQuery.matches) {
                loadMenu();
            }
        });
    }

    // Load swiper content
    fetch('swiper.html')
        .then(response => response.text())
        .then(html => {
            const swiperContainer = document.getElementById('container-for-swiper');
            if (swiperContainer) {
                swiperContainer.innerHTML = html;
            }
        })
        .catch(error => {
            console.error('Error loading swiper content:', error);
        });

    // Load uslogui content
    fetch('uslogui.html')
        .then(response => response.text())
        .then(html => {
            const usloguiContainer = document.getElementById('usloguiContent');
            if (usloguiContainer) {
                usloguiContainer.innerHTML = html;
                const secondMainContent = document.getElementById("secondMainContentItems2");
                const addition = document.getElementById("addition2");
                const click = document.getElementById("click_footer2");

                if (click && addition && secondMainContent) {
                    click.addEventListener("click", () => {
                        if (addition.textContent === "Показать все") {
                            secondMainContent.style.display = "grid";
                            if (mediaQuery.matches) {
                                secondMainContent.style.gridTemplateColumns = "repeat(4, 1fr)";
                            } else {
                                secondMainContent.style.gridTemplateColumns = "repeat(3, 1fr)";
                            }
                            addition.textContent = "Скрыть";
                        } else {
                            secondMainContent.style.display = "none";
                            addition.textContent = "Показать все";
                        }
                    });
                }
            }
        })
        .catch(error => {
            console.error('Error loading uslogui content:', error);
        });

    fetch('price.html')
        .then(response => response.text())
        .then(html => {
            const priceContainer = document.getElementById('priceContainer');
            if (priceContainer) {
                priceContainer.innerHTML = html;
            }
        })
        .catch(error => {
            console.error('Error loading uslogui content:', error);
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(html => {
            const myFooter = document.getElementById('myFooter');
            if (myFooter) {
                myFooter.innerHTML = html;
            }
        })
        .catch(error => {
            console.error('Error loading uslogui content:', error);
        });
});