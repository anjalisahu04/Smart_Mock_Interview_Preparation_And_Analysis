package com.MockPrep.backend.Repository;

import com.MockPrep.backend.Model.InterviewSession;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InterviewRepository extends MongoRepository<InterviewSession, String> {
    List<InterviewSession> findByUserEmailOrderByStartTimeDesc(String userEmail);
    @Query("{ 'userEmail': ?0, 'status': 'COMPLETED' }")
    List<InterviewSession> findCompletedByUserEmail(String userEmail);
    @Query("{ 'userEmail': ?0, 'status': 'IN_PROGRESS' }")
    List<InterviewSession> findActiveByUserEmail(String userEmail);
    long countByUserEmail(String userEmail);
    List<InterviewSession> findByUserEmailAndDomainOrderByStartTimeDesc(String userEmail, String domain);
}