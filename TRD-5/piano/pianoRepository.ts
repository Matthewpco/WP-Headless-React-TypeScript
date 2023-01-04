import axios from 'axios';
import { uniqBy } from 'lodash/fp';

// disabling this rule, because we are fetching data in snake_case format and need to transform it
/* eslint-disable @typescript-eslint/naming-convention */

class PianoRepository {
  makeRequest(endpoint: string, params: object = {}) {
    return axios.post('/api/piano', { endpoint, params });
  }

  makeIdRequest(endpoint: string, params: object = {}) {
    return axios.post('/api/piano/id', { endpoint, params });
  }

  makeUpdateUserRequest(endpoint: string, params: object = {}) {
    return axios.post('/api/piano/updateUser', { endpoint, params });
  }

  async getUserData(uid: string) {
    const { data: { user, user: { custom_fields = {} } = {} } = {} } =
      await this.makeRequest('/publisher/user/get', { uid });
    const flatData = custom_fields.reduce(
      (buffer: object, item: { fieldName: string; value: any }) => ({
        ...buffer,
        [item.fieldName]: item.value,
      }),
      {},
    );

    const getOptionsByName = (fieldName: string) =>
      custom_fields.find((field: any) => field.fieldName === fieldName)
        ?.options;

    let ba_country = flatData.ba_country;
    try {
      ba_country = JSON.parse(ba_country)?.[0] ?? '';
    } catch {
      ba_country = '';
    }
    let ba_region = flatData.ba_region;
    try {
      ba_region = JSON.parse(ba_region)?.[0] ?? '';
    } catch {
      ba_region = '';
    }
    let job_industry = flatData.job_industry;
    try {
      job_industry = JSON.parse(job_industry)?.[0];
    } catch {}
    let job_role = flatData.job_role;
    try {
      job_role = JSON.parse(job_role)?.[0];
    } catch {}
    let jobtitle = flatData.jobtitle;
    try {
      jobtitle = JSON.parse(jobtitle)?.[0];
    } catch {}
    let sa_country = flatData.sa_country;
    try {
      sa_country = JSON.parse(sa_country)?.[0] ?? '';
    } catch {
      sa_country = '';
    }
    let sa_region = flatData.sa_region;
    try {
      sa_region = JSON.parse(sa_region)?.[0] ?? '';
    } catch {
      sa_region = '';
    }

    return {
      options: {
        jobTitle: getOptionsByName('jobtitle'),
        jobIndustry: getOptionsByName('job_industry'),
        jobRole: getOptionsByName('job_role'),
        country: getOptionsByName('ba_country'),
        region: getOptionsByName('ba_region'),
      },
      billingAddress: {
        city: flatData.ba_city,
        country: ba_country,
        firstName: flatData.ba_first_name || user.first_name,
        lastName: flatData.ba_last_name || user.last_name,
        region: ba_region,
        streetAddress1: flatData.ba_street_address_1,
        streetAddress2: flatData.ba_street_address_2,
        zip: flatData.ba_zip,
      },
      personalDetails: {
        firstName: user.first_name,
        lastName: user.last_name,
        createDate: user.create_date,
        image1: user.image1,
        email: user.email,
        personalName: user.personal_name,
        resetPasswordEmailSent: user.reset_password_email_sent,
        uid: user.uid,
        company: flatData.company,
        jobIndustry: job_industry,
        jobRole: job_role,
        jobTitle: jobtitle,
        listingPublicBetaOptin: flatData.listing_public_beta_optin,
        phone: flatData.phone,
      },
      trdPro: {
        brokerage: flatData.pro_brokerage,
        brokerageSide: flatData.pro_brokerage_side,
        launchGroup: flatData.pro_launch_group,
        markets: flatData.pro_markets,
        onboarding: flatData.pro_onboarding,
        propertiesRetain: flatData.pro_properties_retain,
        role: flatData.pro_role,
        rolePrimary: flatData.pro_role_primary,
        sectors: flatData.pro_sectors,
      },
      shippingAddress: {
        city: flatData.sa_city,
        country: sa_country,
        firstName: flatData.sa_first_name || user.first_name,
        lastName: flatData.sa_last_name || user.last_name,
        region: sa_region,
        streetAddress1: flatData.sa_street_address_1,
        streetAddress2: flatData.sa_street_address_2,
        zip: flatData.sa_zip,
      },
      sailthru: {
        chicagodaily: flatData.sailthru_chicagodaily,
        chicagoweekly: flatData.sailthru_chicagoweekly,
        commercialweekly: flatData.sailthru_commercialweekly,
        dailydirt: flatData.sailthru_dailydirt,
        futurecity: flatData.sailthru_futurecity,
        hamptonsweekly: flatData.sailthru_hamptonsweekly,
        losangelesdaily: flatData.sailthru_losangelesdaily,
        losangelesweekly: flatData.sailthru_losangelesweekly,
        nationalweekly: flatData.nulsailthru_nationalweeklyl,
        newyorkdaily: flatData.sailthru_newyorkdaily,
        newyorkweekly: flatData.sailthru_newyorkweekly,
        residentialweekly: flatData.sailthru_residentialweekly,
        sanfranciscoweekly: flatData.sailthru_sanfranciscoweekly,
        sid: flatData.sailthru_sid,
        southfloridadaily: flatData.sailthru_southfloridadaily,
        southfloridaweekly: flatData.sailthru_southfloridaweekly,
        texasweekly: flatData.sailthru_texasweekly,
        trdataretailleases: flatData.sailthru_trdataretailleases,
        tristateweekly: flatData.sailthru_tristateweekly,
      },
    };
  }

  async updateUserData(data: any) {
    const uid = data.personalDetails?.uid;
    const email = data.personalDetails?.email;
    const first_name = data.personalDetails?.firstName;
    const last_name = data.personalDetails?.lastName;
    const custom_fields = {
      phone: data.personalDetails?.phone,
      job_role: `["${data.personalDetails?.jobRole}"]`,
      jobtitle: `["${data.personalDetails?.jobTitle}"]`,
      job_industry: `["${data.personalDetails?.jobIndustry}"]`,
      company: data.personalDetails?.company,

      ba_city: data.billingAddress?.city,
      ba_country:
        data.billingAddress?.country !== ''
          ? `["${data.billingAddress?.country}"]`
          : undefined,
      ba_first_name: data.billingAddress?.firstName,
      ba_last_name: data.billingAddress?.lastName,
      ba_region:
        data.billingAddress?.region !== ''
          ? `["${data.billingAddress?.region}"]`
          : undefined,
      ba_street_address_1: data.billingAddress?.streetAddress1,
      ba_street_address_2: data.billingAddress?.streetAddress2,
      ba_zip: data.billingAddress?.zip,

      sa_city: data.shippingAddress?.city,
      sa_country:
        data.shippingAddress?.country !== ''
          ? `["${data.shippingAddress?.country}"]`
          : undefined,
      sa_first_name: data.shippingAddress?.firstName,
      sa_last_name: data.shippingAddress?.lastName,
      sa_region:
        data.shippingAddress?.region !== ''
          ? `["${data.shippingAddress?.region}"]`
          : undefined,
      sa_street_address_1: data.shippingAddress?.streetAddress1,
      sa_street_address_2: data.shippingAddress?.streetAddress2,
      sa_zip: data.shippingAddress?.zip,
    };

    try {
      return await this.makeUpdateUserRequest('/publisher/user/update', {
        uid,
        email,
        first_name,
        last_name,
        custom_fields,
      });
    } catch (e) {
      //
    }
  }

  async getBillingHistory(uid: string) {
    const { data } = await this.makeRequest('/publisher/conversion/list', {
      uid,
    });

    return data.conversions.reduce((buffer: any[], dp: any) => {
      if (dp.user_payment) {
        return [
          ...buffer,
          {
            name: dp.user_access?.resource?.name || dp.term?.resource?.name,
            paymentDate: new Date(dp.create_date * 1000).toLocaleDateString(
              'en-US',
              { year: 'numeric', month: 'short', day: 'numeric' },
            ),
            paymentMethod: dp.user_payment?.payment_method ?? 'Free',
            price: dp.user_payment?.price ?? 0,
            status:
              dp.user_payment?.subscription?.status === 'cancelled'
                ? 'Refunded'
                : 'Completed',
          },
        ];
      }

      return buffer;
    }, []);
  }

  async getSubscriptions(uid: string) {
    const { data: subBody } = await this.makeRequest(
      '/publisher/subscription/stats',
      { uid },
    );
    const { data: accessData } = await this.makeRequest(
      '/publisher/user/access/list',
      { uid },
    );

    const adoptedSubBody =
      subBody?.data?.map((data: any) => ({
        rid: data.rid,
        isExpired: data.access_expired,
        isNextBilling: !!data.next_bill_date,
        name: data.resource_name,
        hasPrint: data.resource_name.toLowerCase().includes('print'),
        billingPlan: data.billing_plan,
        nextBillDate: new Date(
          data.next_bill_date
            ? data.next_bill_date
            : data.subscription_last_payment,
        ).toLocaleDateString(),
      })) ?? [];

    const adoptedAccessData =
      accessData?.accesses?.map((data: any) => ({
        rid: data.resource.rid,
        isExpired: data.expire_date
          ? data.expire_date * 1000 <= Date.now()
          : false,
        isNextBilling: false,
        name: data.resource.name,
        hasPrint: data.resource.name.toLowerCase().includes('print'),
        billingPlan: data.term.payment_billing_plan_description
          ? data.term.payment_billing_plan_description
          : 'Access Granted',
        nextBillDate: data.expire_date
          ? new Date(data.expire_date * 1000).toLocaleDateString()
          : 'Never',
      })) ?? [];

    const fullSubscriptionsList = uniqBy('rid', [
      ...adoptedSubBody,
      ...adoptedAccessData,
    ]);

    const active = fullSubscriptionsList.filter((item) => !item.isExpired);
    const expired = fullSubscriptionsList.filter((item) => item.isExpired);

    return {
      active,
      expired,
    };
  }

  async doSocialLogin(social_type: string) {
    window.localStorage.setItem('currentSocialType', social_type);

    const {
      data: { uri },
    } = await this.makeIdRequest('/publisher/login/social', {
      social_type,
      redirect_uri: window.location.origin + window.location.pathname,
    });

    if (uri) {
      window.location.replace(uri);
    }
  }

  async handleSocialLoginResult() {
    if (window.location.search.includes('response_id')) {
      const urlParams = new URLSearchParams(window.location.search);
      const response_id = urlParams.get('response_id');
      const social_type = window.localStorage.getItem('currentSocialType');

      await this.makeIdRequest('/publisher/login/social/code', {
        response_id,
        social_type,
        redirect_uri: window.location.origin + window.location.pathname,
      });

      alert('Your account was successfully connected.');

      window.location.replace(
        window.location.origin + window.location.pathname,
      );
    }
  }

  async getGifts(uid: string) {
    const {
      data: { vouchers = [] },
    } = await this.makeRequest('/publisher/voucher/list', { uid });

    const data = vouchers.map((voucher: any) => {
      const name = voucher?.resource_name;
      const isPrint = voucher?.resource_name?.toLowerCase().includes('print');
      const isDelivered = voucher?.state === 'delivered';
      const redeemed = voucher?.redeemed?.toLocaleDateString();
      const price = voucher?.price;
      const recipient = `${voucher?.recipient_name} (${voucher?.recipient_email})`;
      const isExpired =
        voucher?.is_refundable ||
        (voucher.expire_date && voucher.expire_date * 1000 <= Date.now());
      let timeTitle = 'Created on';
      let timeText = new Date(voucher.create_date * 1000).toLocaleDateString();

      if (voucher.state === 'assigned') {
        timeTitle = 'Delivery on';
        timeText = new Date(voucher.send_date * 1000).toLocaleDateString();
      } else if (voucher.state === 'delivered') {
        if (voucher.is_refundable) {
          timeTitle = '&nbsp;';
          timeText = 'Refunded';
        } else {
          timeTitle = 'Expire on';
          timeText = new Date(voucher.expire_date * 1000).toLocaleDateString();
        }
      }

      return {
        name,
        price,
        isPrint,
        isDelivered,
        redeemed,
        recipient,
        isExpired,
        timeTitle,
        timeText,
      };
    });

    const active = data.filter((voucher: any) => !voucher.isExpired);
    const expired = data.filter((voucher: any) => voucher.isExpired);

    return { active, expired };
  }

  async resetPassword(email: string) {
    try {
      await this.makeRequest('/publisher/user/resetPassword', { email });
      alert('Your password is reset and we sent reset link on your email.');
    } catch {
      //
    }
  }
}

const PianoRepositoryInstance = new PianoRepository();

export { PianoRepositoryInstance as PianoRepository };
