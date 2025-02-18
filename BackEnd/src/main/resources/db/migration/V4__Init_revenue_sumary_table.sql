CREATE TABLE IF NOT EXISTS t_revenue_summary
(
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_range_type VARCHAR(50) NOT NULL, -- 'daily', 'monthly', 'yearly'
    summary_date    DATE        NOT NULL,
    total_revenue   BIGINT(20) DEFAULT 0,
    created_at      DATETIME   DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
