program main
    implicit none

    integer :: ndim
    real(8), dimension(:), allocatable :: omega1, omega2, theta1in, theta2in, dydt1, dydt2, theta1out, theta2out
    real(8) :: h, t, pi, val, a, b, lambda2, lambda3, coupling1_step, coupling1_max, coupling1_min, alpha
    real(8) :: omega_mean1, omega_mean2, r1, r2, r1_final, r2_final, rho1, rho2, rho1_final, rho2_final
    real(8) :: rx1, ry1, rx2, ry2, rhox1, rhoy1, rhox2, rhoy2, shi1, shi2, phi1, phi2
    integer :: i, it, itrans, nstep,j
    real(8), allocatable, dimension(:) :: coupling1_values
    real(8) :: coupling1
    character(len=100) :: input_line
    h = 0.01d0
    nstep = 20000
    t = 0.0d0
    itrans = 10000
    pi = 4.0d0 * atan(1.0d0)
    
    read(*, *) ndim
    allocate(omega1(ndim), omega2(ndim), theta1in(ndim), theta2in(ndim), dydt1(ndim), dydt2(ndim), &
             theta1out(ndim), theta2out(ndim))
    read(*, *) lambda2
    read(*, *) lambda3
    read(*, *) coupling1_step
    read(*, *) coupling1_max
    read(*, *) coupling1_min

    alpha = 1.0d0

    ! Initialize omega1 and omega2 with Lorenzian distribution
    omega_mean1 = 0.0d0
    omega_mean2 = 0.0d0
    do i = 1, ndim
        omega1(i) = alpha * tan((dble(i) * pi) / dble(ndim) - ((ndim + 1) * pi) / (2.0d0 * ndim))
        omega2(i) = alpha * tan((dble(i) * pi) / dble(ndim) - ((ndim + 1) * pi) / (2.0d0 * ndim))
        omega_mean1 = omega_mean1 + omega1(i)
        omega_mean2 = omega_mean2 + omega2(i)
    end do

    omega_mean1 = omega_mean1 / dble(ndim)
    omega_mean2 = omega_mean2 / dble(ndim)

    ! Initialize theta1in and theta2in
    do i = 1, ndim
        call random_number(theta1in(i))
        theta1in(i) = -pi + 2.0d0 * pi * theta1in(i)
        theta2in(i) = 2.0d0 * pi
    end do

    ! Allocate coupling1_values
    allocate(coupling1_values(int((coupling1_max - coupling1_min) / coupling1_step) + 1))
    coupling1_values = [(coupling1_min + dble(i - 1) * coupling1_step, i = 1, size(coupling1_values))]

    do i = 1, size(coupling1_values)
        
        coupling1 = coupling1_values(i)
        r1 = 0.0d0
        r2 = 0.0d0
        r1_final = 0.0d0
        r2_final = 0.0d0
        rho1 = 0.0d0
        rho2 = 0.0d0
        rho1_final = 0.0d0
        rho2_final = 0.0d0

        ! Time evolution
        do it = 1, nstep
            ! Calculate order parameters
            rx1 = sum(cos(theta1in))
            ry1 = sum(sin(theta1in))
            rx2 = sum(cos(2.0d0 * theta1in))
            ry2 = sum(sin(2.0d0 * theta1in))
            rhox1 = sum(cos(theta2in))
            rhoy1 = sum(sin(theta2in))
            rhox2 = sum(cos(2.0d0 * theta2in))
            rhoy2 = sum(sin(2.0d0 * theta2in))

            r1 = sqrt(rx1**2 + ry1**2) / dble(ndim)
            r2 = sqrt(rx2**2 + ry2**2) / dble(ndim)
            rho1 = sqrt(rhox1**2 + rhoy1**2) / dble(ndim)
            rho2 = sqrt(rhox2**2 + rhoy2**2) / dble(ndim)
            shi1 = atan2(ry1, rx1)
            shi2 = atan2(ry2, rx2)
            phi1 = atan2(rhoy1, rhox1)
            phi2 = atan2(rhoy2, rhox2)

            ! Runge-Kutta 4 integration
            call rk4(alpha, lambda2, r1, r2, ndim, omega1, omega2, coupling1, theta1in, theta2in, dydt1, dydt2, t, h, &
                     theta1out, theta2out, shi1, shi2, rho1, rho2, phi1, phi2, lambda3)

            theta1in = theta1out
            theta2in = theta2out

            if (it > itrans) then
                r1_final = r1_final + r1
                r2_final = r2_final + r2
                rho1_final = rho1_final + rho1
                rho2_final = rho2_final + rho2
            end if
        end do

        r1_final = r1_final / dble(nstep - itrans)
        r2_final = r2_final / dble(nstep - itrans)
        rho1_final = rho1_final / dble(nstep - itrans)
        rho2_final = rho2_final / dble(nstep - itrans)

        print *, coupling1, r1_final, rho2_final
    end do
    do j = 1, ndim
        print *, theta1in(j), theta2in(j)
    end do
    
    deallocate(coupling1_values)

contains

    subroutine derivs(alpha2, lambda2, r1, r2, ndim, t, omega1, omega2, coupling1, theta1in, theta2in, dydt1, dydt2, &
                      shi1, shi2, rho1, rho2, phi1, phi2, lambda3)
        real(8), intent(in) :: alpha2, lambda2, r1, r2, t, coupling1, shi1, shi2, rho1, rho2, phi1, phi2, lambda3
        integer, intent(in) :: ndim
        real(8), dimension(ndim), intent(in) :: omega1, omega2, theta1in, theta2in
        real(8), dimension(ndim), intent(out) :: dydt1, dydt2
        real(8) :: sigma1, sigma2, sigma3
        integer :: i

        sigma1 = 0.0d0
        sigma2 = 0.0d0
        sigma3 = 0.0d0

        do i = 1, ndim
            dydt1(i) = omega1(i) + coupling1 * r1 * sin(shi1 - theta1in(i)) + &
                       lambda2 * r1 * r2 * sin(shi2 - shi1 - theta1in(i)) + &
                       lambda3 * r1 * r1 * rho1 * sin(shi1 - theta1in(i))

            dydt2(i) = omega2(i) + sigma1 * rho1 * sin(phi1 - theta2in(i)) + &
                       sigma2 * rho1 * rho2 * sin(phi2 - phi1 - theta2in(i)) + &
                       sigma3 * rho1 * rho1 * rho1 * sin(phi1 - theta2in(i))
        end do
    end subroutine derivs

    subroutine rk4(alpha2, lambda2, r1, r2, n, omega1, omega2, coupling1, y1, y2, dydt1, dydt2, t, h, yout1, yout2, &
                   shi1, shi2, rho1, rho2, phi1, phi2, lambda3)
        real(8), intent(in) :: alpha2, lambda2, r1, r2, coupling1, t, h, shi1, shi2, rho1, rho2, phi1, phi2, lambda3
        integer, intent(in) :: n
        real(8), dimension(n), intent(in) :: omega1, omega2, y1, y2
        real(8), dimension(n), intent(out) :: yout1, yout2
        real(8), dimension(n), intent(inout) :: dydt1, dydt2
        real(8), dimension(n) :: yt1, yt2, dyt1, dyt2, dym1, dym2
        real(8) :: hh, h6, th

        hh = h * 0.5d0
        h6 = h / 6.0d0
        th = t + hh

        call derivs(alpha2, lambda2, r1, r2, n, t, omega1, omega2, coupling1, y1, y2, dydt1, dydt2, shi1, shi2, &
                    rho1, rho2, phi1, phi2, lambda3)

        yt1 = y1 + hh * dydt1
        yt2 = y2 + hh * dydt2

        call derivs(alpha2, lambda2, r1, r2, n, th, omega1, omega2, coupling1, yt1, yt2, dyt1, dyt2, shi1, shi2, &
                    rho1, rho2, phi1, phi2, lambda3)

        yt1 = y1 + hh * dyt1
        yt2 = y2 + hh * dyt2

        call derivs(alpha2, lambda2, r1, r2, n, th, omega1, omega2, coupling1, yt1, yt2, dym1, dym2, shi1, shi2, &
                    rho1, rho2, phi1, phi2, lambda3)

        yt1 = y1 + h * dym1
        dym1 = dyt1 + dym1
        yt2 = y2 + h * dym2
        dym2 = dyt2 + dym2

        call derivs(alpha2, lambda2, r1, r2, n, t + h, omega1, omega2, coupling1, yt1, yt2, dyt1, dyt2, shi1, shi2, &
                    rho1, rho2, phi1, phi2, lambda3)

        yout1 = y1 + h6 * (dydt1 + dyt1 + 2.0d0 * dym1)
        yout2 = y2 + h6 * (dydt2 + dyt2 + 2.0d0 * dym2)
    end subroutine rk4

end program main