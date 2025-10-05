package com.movieticket.movie.Mappers;


import com.movieticket.movie.models.Booking;
import com.movieticket.movie.models.PaymentMethod;
import com.movieticket.movie.models.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BookingMapper {
    public Booking toBooking(String bookId, String showtimeId, String seatId, LocalDateTime bookingDate, String paymentStatus, PaymentMethod paymentMethod){
        return Booking.builder()
                .bookId(bookId)
                .showtimeId(showtimeId)
                .seatId(seatId)
                .bookingDate(bookingDate)
                .paymentStatus(paymentStatus)
                .paymentMethod(paymentMethod)
                .build();
    }
}
