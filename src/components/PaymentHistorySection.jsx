import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Search, 
  Filter, 
  ChevronDown, 
  Eye, 
  RefreshCw, 
  HelpCircle, 
  MessageSquare, 
  Mail, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ArrowRightCircle,
  X
} from 'lucide-react';

const PaymentHistorySection = ({ activeSection }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('this-month');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const sectionId = 'billing-payment-history';
  const activeId = 'payment-history';
  
  if (activeSection !== activeId) return null;

  // Mock payment data
  const paymentHistory = [
    {
      id: 'TXN-10021',
      date: '10 Jul',
      plan: 'Pro',
      amount: '$19',
      paymentMethod: 'Visa',
      status: 'paid',
      tax: '$2',
      total: '$21',
      billingAddress: 'Pakistan',
      last4: '4521'
    },
    {
      id: 'TXN-10020',
      date: '10 Jun',
      plan: 'Pro',
      amount: '$19',
      paymentMethod: 'Visa',
      status: 'paid',
      tax: '$2',
      total: '$21',
      billingAddress: 'Pakistan',
      last4: '4521'
    },
    {
      id: 'TXN-10019',
      date: '10 May',
      plan: 'Pro',
      amount: '$19',
      paymentMethod: 'PayPal',
      status: 'failed',
      tax: '$2',
      total: '$21',
      billingAddress: 'Pakistan',
      last4: '0000'
    }
  ];

  // Mock refund data
  const refundHistory = [
    {
      date: '15 Jun',
      amount: '$19',
      reason: 'Duplicate Payment',
      status: 'refunded'
    }
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      paid: {
        icon: CheckCircle2,
        className: 'status-paid',
        text: 'Paid'
      },
      pending: {
        icon: Clock,
        className: 'status-pending',
        text: 'Pending'
      },
      failed: {
        icon: XCircle,
        className: 'status-failed',
        text: 'Failed'
      },
      refunded: {
        icon: ArrowRightCircle,
        className: 'status-refunded',
        text: 'Refunded'
      }
    };

    const config = statusMap[status] || statusMap.pending;
    const IconComponent = config.icon;
    return (
      <span className={`payment-status-badge ${config.className}`}>
        <IconComponent size={16} />
        {config.text}
      </span>
    );
  };

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedPayment(null);
  };

  return (
    <section id={sectionId} className={`section payment-history-section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        {/* Header */}
        <div className="payment-header">
          <div className="payment-header-text">
            <h2>Payment History</h2>
            <p>View all your previous payments and transactions.</p>
          </div>
          <div className="payment-header-actions">
            <button className="btn-secondary">
              <Download size={18} />
              Export CSV
            </button>
            <button className="btn-primary">
              <FileText size={18} />
              Download Report
            </button>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="payment-summary-grid">
          <div className="payment-summary-card">
            <span className="payment-summary-label">Total Paid</span>
            <strong className="payment-summary-value">$245</strong>
          </div>
          <div className="payment-summary-card">
            <span className="payment-summary-label">Payments</span>
            <strong className="payment-summary-value">14</strong>
          </div>
          <div className="payment-summary-card">
            <span className="payment-summary-label">Last Payment</span>
            <strong className="payment-summary-value">$19</strong>
          </div>
          <div className="payment-summary-card">
            <span className="payment-summary-label">Pending</span>
            <strong className="payment-summary-value">$0</strong>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="payment-filters-card">
          <div className="payment-filters-row">
            {/* Search */}
            <div className="payment-search-wrap">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search Transaction..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="payment-filters-buttons">
              {/* Status Filter */}
              <div className="payment-filter-btn-wrap">
                <button 
                  className="btn-secondary"
                  onClick={() => setStatusFilter(statusFilter === 'all' ? 'paid' : 'all')}
                >
                  <Filter size={18} />
                  Status
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* Date Filter */}
              <div className="payment-filter-btn-wrap">
                <button 
                  className="btn-secondary"
                  onClick={() => setDateFilter(dateFilter === 'this-month' ? 'last-month' : 'this-month')}
                >
                  Date
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* Payment Method Filter */}
              <div className="payment-filter-btn-wrap">
                <button 
                  className="btn-secondary"
                  onClick={() => setPaymentMethodFilter(paymentMethodFilter === 'all' ? 'visa' : 'all')}
                >
                  Payment Method
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="payment-table-card">
          <div className="payment-table-wrapper">
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      <span className="payment-txn-id">{payment.id}</span>
                    </td>
                    <td>{payment.date}</td>
                    <td>
                      <span className="payment-plan-badge">{payment.plan}</span>
                    </td>
                    <td className="payment-amount">{payment.amount}</td>
                    <td>{payment.paymentMethod}</td>
                    <td>{getStatusBadge(payment.status)}</td>
                    <td>
                      {payment.status === 'failed' ? (
                        <button className="btn-primary">
                          <RefreshCw size={16} />
                          Retry
                        </button>
                      ) : (
                        <button 
                          className="btn-secondary"
                          onClick={() => handleViewPayment(payment)}
                        >
                          <Eye size={16} />
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Refund History (Optional) */}
        <div className="refund-history-card">
          <h3>Refund History</h3>
          <div className="refund-table-wrapper">
            <table className="refund-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {refundHistory.map((refund, index) => (
                  <tr key={index}>
                    <td>{refund.date}</td>
                    <td className="refund-amount">{refund.amount}</td>
                    <td>{refund.reason}</td>
                    <td>{getStatusBadge(refund.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Need Help */}
        <div className="help-card">
          <h3>Need Help?</h3>
          <div className="help-buttons">
            <button className="help-btn">
              <HelpCircle size={18} />
              Billing FAQ
            </button>
            <button className="help-btn">
              <Mail size={18} />
              Contact Support
            </button>
            <button className="help-btn">
              <MessageSquare size={18} />
              Live Chat
            </button>
          </div>
        </div>
      </div>

      {/* Payment Details Drawer */}
      {isDrawerOpen && selectedPayment && (
        <>
          <div 
            className="drawer-overlay"
            onClick={closeDrawer}
          />
          <div className="payment-drawer">
            <div className="payment-drawer-header">
              <h3>Payment Details</h3>
              <button 
                className="drawer-close-btn"
                onClick={closeDrawer}
              >
                <X size={24} />
              </button>
            </div>

            <div className="payment-drawer-content">
              <div className="payment-detail-row">
                <span className="payment-detail-label">Transaction ID</span>
                <span className="payment-detail-value">{selectedPayment.id}</span>
              </div>
              <div className="payment-detail-row">
                <span className="payment-detail-label">Date</span>
                <span className="payment-detail-value">{selectedPayment.date} 2026</span>
              </div>
              <div className="payment-detail-row">
                <span className="payment-detail-label">Plan</span>
                <span className="payment-detail-value">{selectedPayment.plan}</span>
              </div>
              <div className="payment-detail-row">
                <span className="payment-detail-label">Amount</span>
                <span className="payment-detail-value">{selectedPayment.amount}</span>
              </div>
              <div className="payment-detail-row">
                <span className="payment-detail-label">Tax</span>
                <span className="payment-detail-value">{selectedPayment.tax}</span>
              </div>
              <div className="payment-detail-row">
                <span className="payment-detail-label">Total</span>
                <span className="payment-detail-value payment-detail-total">{selectedPayment.total}</span>
              </div>
              <div className="payment-detail-row">
                <span className="payment-detail-label">Payment Method</span>
                <span className="payment-detail-value">{selectedPayment.paymentMethod} ****{selectedPayment.last4}</span>
              </div>
              <div className="payment-detail-row">
                <span className="payment-detail-label">Billing Address</span>
                <span className="payment-detail-value">{selectedPayment.billingAddress}</span>
              </div>
              <div className="payment-detail-row">
                <span className="payment-detail-label">Status</span>
                {getStatusBadge(selectedPayment.status)}
              </div>
            </div>

            <div className="payment-drawer-actions">
              <button className="btn-primary w-full">
                <Download size={18} />
                Download Receipt
              </button>
              <button className="btn-secondary w-full">
                <FileText size={18} />
                Download Invoice
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default PaymentHistorySection;
